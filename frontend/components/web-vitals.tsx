'use client'

import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  const appInsights = useAppInsightsContext()

  useReportWebVitals(metric => {
    appInsights.trackMetric(
      {
        name: metric.name,
        average: metric.value
      },
      {}
    )
  })

  return null
}
