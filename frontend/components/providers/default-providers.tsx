import { ReactNode } from 'react'
import { AppInsightsProvider } from '@/components/providers/app-insights-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { WrapBalancerProvider } from '@/components/providers/wrap-balancer-provider'
import { TopLoaderProvider } from '@/components/providers/top-loader-provider'
import { TooltipProvider } from '@/components/providers/tooltip-provider'
import { MsalProvider } from '@/components/providers/msal-provider'

interface DefaultProvidersProps {
  children: ReactNode
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
  return (
    <AppInsightsProvider>
      <MsalProvider>
        <ThemeProvider>
          <TopLoaderProvider>
            <WrapBalancerProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </WrapBalancerProvider>
          </TopLoaderProvider>
        </ThemeProvider>
      </MsalProvider>
    </AppInsightsProvider>
  )
}
