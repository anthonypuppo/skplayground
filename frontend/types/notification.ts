export interface Notification {
  type: NotificationType
  title: string
  message: string
  utcSeconds: number
}

export const enum NotificationType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}
