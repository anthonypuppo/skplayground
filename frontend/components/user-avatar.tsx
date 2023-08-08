import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps
} from '@/components/ui/avatar'
import { IconUser } from '@/components/ui/icons'
import { useStore } from '@/state'

export function UserAvatar({ ...props }: AvatarProps) {
  const graphUser = useStore(state => state.user.graphUser)

  return (
    <Avatar {...props}>
      {graphUser?.displayName ? (
        <>
          <AvatarImage
            src={`/api/avatar?name=${encodeURIComponent(
              graphUser.displayName
            )}`}
          />
          <AvatarFallback className="bg-background">
            <IconUser className="h-5 w-5" />
          </AvatarFallback>
        </>
      ) : (
        <AvatarFallback className="bg-background">
          <IconUser />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
