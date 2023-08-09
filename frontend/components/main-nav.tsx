'use client'

import Link from 'next/link'
import { IconLogo } from '@/components/ui/icons'
import { siteConfig } from '@/lib/site'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/lib/auth'

export function MainNav() {
  const pathname = usePathname()
  const { instance: msalInstance } = useMsal()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <IconLogo className="h-6 w-6 text-primary" />
        <span className="inline-block font-bold">
          {siteConfig.name.toLowerCase()}
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/playground"
          className={cn(
            'cursor-pointer transition-colors hover:text-foreground/80',
            pathname === '/playground'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
          onClick={e => {
            if (!msalInstance.getActiveAccount()) {
              e.preventDefault()
              e.stopPropagation()
              msalInstance.loginRedirect({
                ...loginRequest,
                redirectStartPage: '/playground'
              })
            }
          }}
        >
          <span>Playground</span>
        </Link>
        <Link
          href={'/faq'}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/faq' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          <span>FAQ</span>
        </Link>
        <Link
          href={'/contact'}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/contact' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          <span>Contact</span>
        </Link>
      </nav>
    </div>
  )
}
