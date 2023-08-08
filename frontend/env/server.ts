import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    GITHUB_ACCESS_TOKEN: z.string().nonempty()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN
  }
})
