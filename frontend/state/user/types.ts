import { User as MicrosoftGraphUser } from '@microsoft/microsoft-graph-types'

export interface UserStateDefinition {
  graphUser?: MicrosoftGraphUser
}

export interface UserStateActions {
  setGraphUser: (graphUser: MicrosoftGraphUser) => void
}

export type UserStateType = UserStateDefinition & UserStateActions
