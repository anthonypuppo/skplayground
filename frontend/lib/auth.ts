import { env } from '@/env/client'
import {
  Configuration,
  RedirectRequest,
  SilentRequest
} from '@azure/msal-browser'

export const msalConfig: Configuration = {
  auth: {
    clientId: env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    redirectUri: '/',
    postLogoutRedirectUri: '/'
  }
}

export const loginRequest: RedirectRequest = {
  scopes: [`api://${env.NEXT_PUBLIC_AUTH_API_CLIENT_ID}/.default`]
}

export const graphRequest: SilentRequest = {
  scopes: ['User.Read']
}

export const apiRequest: SilentRequest = {
  scopes: [`api://${env.NEXT_PUBLIC_AUTH_API_CLIENT_ID}/access_as_user`]
}
