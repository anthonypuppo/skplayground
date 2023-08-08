'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { ReactNode, createContext, useContext, useEffect } from 'react'

interface TopLoaderContextProps {
  start: () => void
  stop: () => void
}

const TopLoaderContext = createContext<TopLoaderContextProps>({
  start: () => null,
  stop: () => null
})

interface TopLoaderProviderProps {
  children: ReactNode
}

let displayTimeoutId: NodeJS.Timeout

export function TopLoaderProvider({ children }: TopLoaderProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const start = () => {
    clearTimeout(displayTimeoutId)
    displayTimeoutId = setTimeout(NProgress.start, 200)
  }

  const stop = () => {
    clearTimeout(displayTimeoutId)
    NProgress.done()
  }

  const findClosestAnchor = (element: HTMLElement | null) => {
    while (element && element.tagName.toLowerCase() !== 'a') {
      if (element.tagName.toLowerCase() === 'button') {
        return null
      }

      element = element.parentElement
    }

    return element as HTMLAnchorElement | null
  }

  const isAnchorOfCurrentUrl = (currentUrl: string, newUrl: string) => {
    const currentUrlObject = new URL(currentUrl)
    const newUrlObject = new URL(newUrl)

    if (
      currentUrlObject.hostname === newUrlObject.hostname &&
      currentUrlObject.pathname === newUrlObject.pathname &&
      currentUrlObject.search === newUrlObject.search
    ) {
      const currentHash = currentUrlObject.hash
      const newHash = newUrlObject.hash

      return (
        currentHash !== newHash &&
        currentUrlObject.href.replace(currentHash, '') ==
          newUrlObject.href.replace(newHash, '')
      )
    }
  }

  useEffect(() => stop(), [pathname, searchParams])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const anchor = findClosestAnchor(target)

      if (anchor) {
        const currentUrl = window.location.href
        const newUrl = anchor.href
        const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl)
        const isExternal = anchor.target === '_blank'

        if (currentUrl === newUrl || isAnchor || isExternal) {
          start()
          stop()
        } else {
          start()
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

  NProgress.configure({
    showSpinner: false
  })

  return (
    <TopLoaderContext.Provider value={{ start, stop }}>
      {children}
    </TopLoaderContext.Provider>
  )
}

export const useTopLoaderContext = () => useContext(TopLoaderContext)
