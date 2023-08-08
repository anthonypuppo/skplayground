'use client'

import { reactPlugin } from '@/lib/app-insights'
import {
  AppInsightsContext,
  AppInsightsErrorBoundary
} from '@microsoft/applicationinsights-react-js'
import { ReactElement } from 'react'
import { ErrorDisplay } from '@/components/error-display'

const ErrorComponent = () => <ErrorDisplay reset={window.location.reload} />

interface AppInsightsProviderProps {
  children: ReactElement
}

export function AppInsightsProvider({ children }: AppInsightsProviderProps) {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      <AppInsightsErrorBoundary
        appInsights={reactPlugin}
        onError={ErrorComponent}
      >
        {children}
      </AppInsightsErrorBoundary>
    </AppInsightsContext.Provider>
  )
}
