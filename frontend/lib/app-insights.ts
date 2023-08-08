import { env } from '@/env/client'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const reactPlugin = new ReactPlugin()
const appInsights = new ApplicationInsights({
  config: {
    connectionString: env.NEXT_PUBLIC_APP_INSIGHTS_CONNECTION_STRING,
    extensions: [reactPlugin],
    enableAutoRouteTracking: true
  }
})

if (appInsights.config.connectionString) {
  appInsights.loadAppInsights()
}

export { reactPlugin, appInsights }
