'use client'

import {
  IconAlertCircle,
  IconCheckCircle,
  IconXCircle
} from '@/components/ui/icons'
import { Notification, NotificationType } from '@/types/notification'

interface NotificationProps {
  notification: Notification
}

export function Notification({ notification }: NotificationProps) {
  return (
    <div className="pointer-events-auto w-full border-b bg-background p-3 transition-all">
      <div className="flex flex-col space-y-2">
        <div className="flex items-start">
          <div className="shrink-0">
            {notification.type == NotificationType.Info ? (
              <IconAlertCircle className="h-5 w-5" />
            ) : notification.type == NotificationType.Success ? (
              <IconCheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <IconXCircle className="h-5 w-5 text-destructive" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-md font-medium leading-5 text-foreground">
              {notification.title}
            </p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              {notification.message}
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <p className="text-xs text-muted-foreground">
            {new Date(notification.utcSeconds * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
