import { AuthenticationTemplate } from '@/components/authentication-template'
import { ReactNode } from 'react'

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <AuthenticationTemplate>
      <div className="container">{children}</div>
    </AuthenticationTemplate>
  )
}
