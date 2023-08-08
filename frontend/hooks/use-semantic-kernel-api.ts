'use client'

import { UseQueryOptions } from '@tanstack/react-query'
import { useApiQuery } from '@/hooks/use-api'
import { SkillsResult } from '@/types/semantic-kernel'
import { env } from '@/env/client'

const semanticKernelRouteBase = 'semantic-kernel'

export const useSkillsApiQuery = (
  queryConfig?: Omit<UseQueryOptions<SkillsResult>, 'queryKey'>
) =>
  useApiQuery({
    url: `${env.NEXT_PUBLIC_API_URL}/${semanticKernelRouteBase}/skills?api-version=${env.NEXT_PUBLIC_API_VERSION}`,
    queryConfig: {
      queryKey: [semanticKernelRouteBase, 'skills'],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: 0,
      ...queryConfig
    }
  })
