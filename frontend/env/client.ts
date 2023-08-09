import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APP_INSIGHTS_CONNECTION_STRING: z.string().optional(),
    NEXT_PUBLIC_AUTH_CLIENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_AUTH_API_CLIENT_ID: z.string().nonempty(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_API_VERSION: z.string().nonempty()
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_INSIGHTS_CONNECTION_STRING:
      process.env.NEXT_PUBLIC_APP_INSIGHTS_CONNECTION_STRING,
    NEXT_PUBLIC_AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    NEXT_PUBLIC_AUTH_API_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH_API_CLIENT_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_VERSION: process.env.NEXT_PUBLIC_API_VERSION
  }
})
