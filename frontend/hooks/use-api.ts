'use client'

import { apiRequest } from '@/lib/auth'
import { IPublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import ky from 'ky'
import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query'

type ApiQueryOptions<T> = {
  url: string
  queryConfig?: Omit<UseQueryOptions<T>, 'queryFn'>
}

const getAccessToken = async (msalInstance: IPublicClientApplication) => {
  const account = msalInstance.getActiveAccount()

  if (!account) {
    throw new Error('No active account')
  }

  const tokenResponse = await msalInstance.acquireTokenSilent({
    ...apiRequest,
    account
  })

  return tokenResponse.accessToken
}

export function useApiQuery<T>({ url, queryConfig }: ApiQueryOptions<T>) {
  const { instance: msalInstance } = useMsal()

  const queryFn: QueryFunction<T> = async () => {
    const accessToken = await getAccessToken(msalInstance)
    const response = await ky
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .json<T>()

    return response
  }

  return useQuery({ queryFn, ...queryConfig })
}
