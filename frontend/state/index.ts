import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { CombinedState } from '@/state/types'
import { logger } from '@/state/middleware/logger'
import { siteConfig } from '@/lib/site'
import { createUserState } from '@/state/user'
import { createNotificationsState } from '@/state/notifications'
import { createPlaygroundState } from '@/state/playground'

export const useStore = create<CombinedState>()(
  logger(
    persist(
      immer(
        subscribeWithSelector((...api) => ({
          user: createUserState(...api),
          notifications: createNotificationsState(...api),
          playground: createPlaygroundState(...api)
        }))
      ),
      {
        name: `${siteConfig.name.toLowerCase()}-store`,
        partialize: state => ({
          playground: {
            openAIApiKey: state.playground.openAIApiKey,
            bingApiKey: state.playground.bingApiKey
          }
        }),
        merge: (persistedState, currentState) => {
          const typedPersistedState = persistedState as
            | CombinedState
            | undefined

          return {
            user: currentState.user,
            notifications: currentState.notifications,
            playground: {
              ...currentState.playground,
              ...typedPersistedState?.playground
            }
          }
        }
      }
    )
  )
)
