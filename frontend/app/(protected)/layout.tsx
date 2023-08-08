import { AuthenticationTemplate } from '@/components/authentication-template'
import { ProtectedProviders } from '@/components/providers/protected-providers'
import { ReactNode } from 'react'

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <ProtectedProviders>
      <AuthenticationTemplate>
        <div className="container">{children}</div>
      </AuthenticationTemplate>
    </ProtectedProviders>
  )
}
