'use client'

import { loginRequest } from '@/lib/auth'
import { InteractionType, RedirectRequest } from '@azure/msal-browser'
import {
  MsalAuthenticationResult,
  MsalAuthenticationTemplate
} from '@azure/msal-react'
import { ReactNode } from 'react'
import { ErrorDisplay } from '@/components/error-display'

const AuthErrorComponent = ({ error }: MsalAuthenticationResult) => (
  <ErrorDisplay
    title="Unauthorized"
    error={`Sorry, we ran into a problem authenticating you (${
      error ? error.errorCode : 'unknown error'
    })`}
  />
)

const AuthLoadingComponent = () => <></>

interface AuthenticationTemplateProps {
  children: ReactNode
}

export function AuthenticationTemplate({
  children
}: AuthenticationTemplateProps) {
  const authRequest: RedirectRequest = {
    ...loginRequest
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      loadingComponent={AuthLoadingComponent}
      errorComponent={AuthErrorComponent}
    >
      {children}
    </MsalAuthenticationTemplate>
  )
}
