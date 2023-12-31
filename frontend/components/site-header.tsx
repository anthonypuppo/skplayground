'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { MainNav } from '@/components/main-nav'
import { NotificationsSheet } from '@/components/notifications-sheet'
import { UserNav } from '@/components/user-nav'
import { AuthenticatedTemplate } from '@azure/msal-react'
import { MobileNav } from '@/components/mobile-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <nav className="flex items-center">
            <AuthenticatedTemplate>
              <NotificationsSheet />
            </AuthenticatedTemplate>
            <ThemeToggle />
            <AuthenticatedTemplate>
              <div className="ml-2.5 flex items-center">
                <UserNav />
              </div>
            </AuthenticatedTemplate>
          </nav>
        </div>
      </div>
    </header>
  )
}
