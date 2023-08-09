'use client'

import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { env } from '@/env/client'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import {
  HubConnectionBuilder,
  HubConnectionState,
  IStreamResult,
  JsonHubProtocol,
  LogLevel
} from '@microsoft/signalr'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { apiRequest } from '@/lib/auth'
import { useStore } from '@/state'
import { NotificationType } from '@/types/notification'
import { Ask, AskResult } from '@/types/semantic-kernel'

const hubUrl = `${env.NEXT_PUBLIC_API_URL}/hubs/semantic-kernel`

interface SemanticKernelHubContextProps {
  invokeFunction: (
    skillName: string,
    functionName: string,
    ask: Ask
  ) => IStreamResult<AskResult>
}

const SemanticKernelHubContext = createContext<SemanticKernelHubContextProps>({
  invokeFunction: () => ({}) as IStreamResult<AskResult>
})

interface SemanticKernelHubProviderProps {
  children: ReactNode
}

export function SemanticKernelHubProvider({
  children
}: SemanticKernelHubProviderProps) {
  const appInsights = useAppInsightsContext()
  const { instance: msalInstance } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  const getAccessToken = async () => {
    try {
      const account = msalInstance.getActiveAccount()

      if (account) {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...apiRequest,
          account: account
        })

        return tokenResponse.accessToken
      }
    } catch (err) {
      if (err instanceof Error) {
        appInsights.trackException({ error: err })
      }
    }

    return ''
  }

  const hubConnection = new HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: getAccessToken
    })
    .configureLogging(LogLevel.Warning)
    .withHubProtocol(new JsonHubProtocol())
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: retryContext => {
        const delay = Math.pow(2, retryContext.previousRetryCount + 1) * 100
        const randomSum = delay * 0.2 * Math.random()
        const delayWithJitter = delay + randomSum

        return Math.min(delayWithJitter, 30000)
      }
    })
    .build()

  const invokeFunction = (skillName: string, functionName: string, ask: Ask) =>
    hubConnection.stream<AskResult>(
      'InvokeFunction',
      skillName,
      functionName,
      ask
    )

  useEffect(() => {
    if (isAuthenticated) {
      if (hubConnection.state == HubConnectionState.Disconnected) {
        hubConnection.onreconnecting(() => {
          useStore.getState().notifications.pushNotification({
            type: NotificationType.Info,
            utcSeconds: Date.now() / 1000,
            title: 'SignalR',
            message: 'Reconnecting...'
          })
        })
        hubConnection.onreconnected(() => {
          useStore.getState().notifications.pushNotification({
            type: NotificationType.Success,
            utcSeconds: Date.now() / 1000,
            title: 'SignalR',
            message: 'Connection re-established.'
          })
        })
        hubConnection.onclose(() => {
          useStore.getState().notifications.pushNotification({
            type: NotificationType.Error,
            utcSeconds: Date.now() / 1000,
            title: 'SignalR',
            message: 'Connection closed. Please refresh the page to reconnect.'
          })
        })
        hubConnection.on('ReceiveNotification', notification => {
          useStore.getState().notifications.pushNotification(notification)
        })
        hubConnection.start().catch(err => {
          if (err instanceof Error) {
            appInsights.trackException({ error: err })
          }

          useStore.getState().notifications.pushNotification({
            type: NotificationType.Error,
            utcSeconds: Date.now() / 1000,
            title: 'SignalR',
            message:
              'Unable to start the connection. Please refresh the page to try again.'
          })
        })
      }
    }
  }, [isAuthenticated])

  return (
    <SemanticKernelHubContext.Provider value={{ invokeFunction }}>
      {children}
    </SemanticKernelHubContext.Provider>
  )
}

export const useSemanticKernelHubContext = () =>
  useContext(SemanticKernelHubContext)
