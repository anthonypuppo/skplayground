'use client'

import { ReactNode } from 'react'
import { TooltipProvider as UITooltipProvider } from '@/components/ui/tooltip'

interface TooltipProviderProps {
  children: ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return (
    <UITooltipProvider delayDuration={200} skipDelayDuration={100}>
      {children}
    </UITooltipProvider>
  )
}
