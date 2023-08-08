'use client'

import { useStore } from '@/state'
import { Button } from '@/components/ui/button'
import { IconBell } from '@/components/ui/icons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { NotificationsList } from '@/components/notifications-list'

export function NotificationsSheet() {
  const { notifications, hasNew, setHasNew } = useStore(
    state => state.notifications
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative inline-flex w-9 px-0 align-middle"
          onClick={() => setHasNew(false)}
        >
          <IconBell />
          {hasNew && (
            <span className="absolute right-2 top-1 flex h-[9px] w-[9px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/75"></span>
              <span className="relative inline-flex h-[9px] w-[9px] rounded-full bg-primary"></span>
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={e => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <NotificationsList notifications={notifications} />
      </SheetContent>
    </Sheet>
  )
}
