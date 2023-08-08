import { StateSlice } from '@/state/types'
import {
  NotificationsStateDefinition,
  NotificationsStateType
} from '@/state/notifications/types'
import { toast } from 'sonner'

const initialNotificationsState: NotificationsStateDefinition = {
  notifications: [],
  hasNew: false
}

export const createNotificationsState: StateSlice<
  NotificationsStateType
> = set => ({
  ...initialNotificationsState,
  pushNotification: payload => {
    set(
      state => {
        state.notifications.notifications = [
          ...state.notifications.notifications,
          payload
        ]
        state.notifications.hasNew = true

        switch (payload.type) {
          case 'info':
            toast.message(payload.message)

            break
          case 'success':
            toast.success(payload.message)

            break
          case 'error':
            toast.error(payload.message)

            break
        }
      },
      false,
      {
        type: 'notifications/pushNotification',
        payload
      }
    )
  },
  setHasNew: payload => {
    set(
      state => {
        state.notifications.hasNew = payload
      },
      false,
      {
        type: 'notifications/setHasNew',
        payload
      }
    )
  }
})
