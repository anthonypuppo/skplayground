import { ReactNode } from 'react'
import { AppInsightsProvider } from '@/components/providers/app-insights-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { WrapBalancerProvider } from '@/components/providers/wrap-balancer-provider'
import { TopLoaderProvider } from '@/components/providers/top-loader-provider'
import { TooltipProvider } from '@/components/providers/tooltip-provider'
import { MsalProvider } from '@/components/providers/msal-provider'
import { SemanticKernelHubProvider } from '@/components/providers/semantic-kernel-hub-provider'
import { QueryClientProvider } from '@/components/providers/query-client-provider'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AppInsightsProvider>
      <MsalProvider>
        <SemanticKernelHubProvider>
          <QueryClientProvider>
            <ThemeProvider>
              <TopLoaderProvider>
                <WrapBalancerProvider>
                  <TooltipProvider>{children}</TooltipProvider>
                </WrapBalancerProvider>
              </TopLoaderProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </SemanticKernelHubProvider>
      </MsalProvider>
    </AppInsightsProvider>
  )
}
