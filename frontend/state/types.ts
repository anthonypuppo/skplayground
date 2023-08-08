import { StateCreator } from 'zustand'
import { UserStateType } from '@/state/user/types'
import { NotificationsStateType } from '@/state/notifications/types'
import { PlaygroundStateType } from '@/state/playground/types'

export interface CombinedState {
  user: UserStateType
  notifications: NotificationsStateType
  playground: PlaygroundStateType
}

export type StateSlice<T> = StateCreator<
  CombinedState,
  [['zustand/immer', never], ['logger', never]],
  [['zustand/persist', unknown]],
  T
>
