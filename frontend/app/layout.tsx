import '@/styles/globals.css'
import { siteConfig } from '@/lib/site'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'
import { DefaultProviders } from '@/components/providers/default-providers'
import { WebVitals } from '@/components/web-vitals'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Toaster } from '@/components/ui/toaster'
import { env } from '@/env/client'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} - %s`
  },
  description: siteConfig.description,
  authors: [
    {
      name: siteConfig.creator,
      url: siteConfig.links.gitHub.profile
    }
  ],
  creator: siteConfig.creator,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${env.NEXT_PUBLIC_APP_URL}/site.webmanifest`
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <DefaultProviders>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">
              <div className="relative my-4">{children}</div>
            </div>
            <SiteFooter />
          </div>
          <Toaster />
          <WebVitals />
        </DefaultProviders>
      </body>
    </html>
  )
}
