'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/lib/site'
import { IconLogo, IconPanelRightClose } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/lib/auth'

export function MobileNav() {
  const { instance: msalInstance } = useMsal()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <IconPanelRightClose className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pr-0"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <IconLogo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name.toLowerCase()}</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] overflow-y-auto pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/playground"
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
              Playground
            </Link>
            <MobileLink href="/faq" onOpenChange={setOpen}>
              FAQ
            </MobileLink>
            <MobileLink href="/contact" onOpenChange={setOpen}>
              Contact
            </MobileLink>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
