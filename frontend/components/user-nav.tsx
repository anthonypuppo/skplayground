'use client'

import { useStore } from '@/state'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { useMsal } from '@azure/msal-react'
import { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { loginRequest } from '@/lib/auth'
import { useMicrosoftGraphClient } from '@/hooks/use-microsoft-graph-client'

export function UserNav() {
  const appInsights = useAppInsightsContext()
  const microsoftGraphClient = useMicrosoftGraphClient()
  const { instance: msalInstance } = useMsal()
  const { graphUser, setGraphUser } = useStore(state => state.user)

  const logIn = () => {
    msalInstance.loginRedirect({
      ...loginRequest
    })
  }

  const logOut = () =>
    msalInstance.logoutRedirect({
      account: msalInstance.getActiveAccount()
    })

  useEffect(() => {
    if (!graphUser) {
      microsoftGraphClient
        .api('/me')
        .select('displayName,mail')
        .get()
        .then(setGraphUser)
        .catch(err => {
          if (err instanceof Error) {
            appInsights.trackException({ error: err })
          }
        })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="h-8 w-8 border" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {graphUser?.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {graphUser?.mail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={e => {
            e.preventDefault()
            logOut()
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
