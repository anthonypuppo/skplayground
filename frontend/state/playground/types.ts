import { Function, Skill, Variable } from '@/types/semantic-kernel'

export interface PlaygroundStateDefinition {
  openAIApiKey: string
  bingApiKey: string
  selectedSkill?: Skill
  selectedFunction?: Function
  input: string
  inputVariables: Variable[]
  output: string
  outputVariables: Variable[]
  isLoading: boolean
}

export interface PlaygroundStateActions {
  setOpenAIApiKey: (key: string) => void
  setBingApiKey: (key: string) => void
  setSelectedSkill: (skill: Skill) => void
  clearSelectedSkill: () => void
  setSelectedFunction: (func: Function) => void
  setInput: (input: string) => void
  addInputVariable: (variable: Variable) => void
  editInputVariable: (variable: Variable) => void
  removeInputVariable: (variable: Variable) => void
  setOutput: (output: string) => void
  setOutputVariables: (variables: Variable[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export type PlaygroundStateType = PlaygroundStateDefinition &
  PlaygroundStateActions
