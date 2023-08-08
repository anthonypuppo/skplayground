'use client'

import { appInsights } from '@/lib/app-insights'
import { msalConfig } from '@/lib/auth'
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  PublicClientApplication
} from '@azure/msal-browser'
import { MsalProvider as MsalReactProvider } from '@azure/msal-react'
import { ReactNode } from 'react'

const msalInstance = new PublicClientApplication(msalConfig)
const accounts = msalInstance.getAllAccounts()

if (accounts.length > 0) {
  const account = accounts[0]

  msalInstance.setActiveAccount(account)
  appInsights.setAuthenticatedUserContext(account.localAccountId)
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType == EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult
    const account = payload.account

    if (account) {
      msalInstance.setActiveAccount(account)
      appInsights.setAuthenticatedUserContext(account.localAccountId)
    }
  }
})

interface MsalProviderProps {
  children: ReactNode
}

export function MsalProvider({ children }: MsalProviderProps) {
  return (
    <MsalReactProvider instance={msalInstance}>{children}</MsalReactProvider>
  )
}
