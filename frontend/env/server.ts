import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    SKPLAYGROUND_GITHUB_ACCESS_TOKEN: z.string().optional()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SKPLAYGROUND_GITHUB_ACCESS_TOKEN:
      process.env.SKPLAYGROUND_GITHUB_ACCESS_TOKEN
  }
})
