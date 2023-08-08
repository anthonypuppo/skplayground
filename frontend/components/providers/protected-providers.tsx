import { ReactNode } from 'react'
import { SemanticKernelHubProvider } from '@/components/providers/semantic-kernel-hub-provider'
import { QueryClientProvider } from '@/components/providers/query-client-provider'

interface ProtectedProvidersProps {
  children: ReactNode
}

export function ProtectedProviders({ children }: ProtectedProvidersProps) {
  return (
    <SemanticKernelHubProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </SemanticKernelHubProvider>
  )
}
