'use client'

import { graphRequest } from '@/lib/auth'
import { useMsal } from '@azure/msal-react'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { Client as MicrosoftGraphClient } from '@microsoft/microsoft-graph-client'

export function useMicrosoftGraphClient() {
  const appInsights = useAppInsightsContext()
  const { instance: msalInstance } = useMsal()

  const getAccessToken = async () => {
    try {
      const account = msalInstance.getActiveAccount()

      if (account) {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...graphRequest,
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

  const microsoftGraphClient = MicrosoftGraphClient.init({
    authProvider: async done => {
      const accessToken = await getAccessToken()

      if (accessToken) {
        done(null, accessToken)
      } else {
        done(new Error('Authentication failed'), null)
      }
    }
  })

  return microsoftGraphClient
}
