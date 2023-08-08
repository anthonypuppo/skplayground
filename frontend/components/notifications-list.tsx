'use client'

import { Notification } from '@/components/notification'
import { type Notification as NotificationType } from '@/types/notification'

interface NotificationsListProps {
  notifications: NotificationType[]
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <div className="flex flex-col space-y-4">
      {[...notifications]
        .sort((a, b) => b.utcSeconds - a.utcSeconds)
        .map((notification, index) => (
          <Notification key={index} notification={notification} />
        ))}
    </div>
  )
}
