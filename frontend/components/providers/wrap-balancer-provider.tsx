'use client'

import { ReactNode } from 'react'
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer'

interface WrapBalancerProviderProps {
  children: ReactNode
}

export function WrapBalancerProvider({ children }: WrapBalancerProviderProps) {
  return <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>
}
