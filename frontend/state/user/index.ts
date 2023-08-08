import { StateSlice } from '@/state/types'
import { UserStateType } from '@/state/user/types'

export const createUserState: StateSlice<UserStateType> = set => ({
  setGraphUser: payload => {
    set(
      state => {
        state.user.graphUser = payload
      },
      false,
      {
        type: 'user/setGraphUser',
        payload
      }
    )
  }
})
