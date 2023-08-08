import { Notification } from '@/types/notification'

export interface NotificationsStateDefinition {
  notifications: Notification[]
  hasNew: boolean
}

export interface NotificationsStateActions {
  pushNotification: (notification: Notification) => void
  setHasNew: (hasNew: boolean) => void
}

export type NotificationsStateType = NotificationsStateDefinition &
  NotificationsStateActions
