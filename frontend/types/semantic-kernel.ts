export interface Ask {
  input?: string
  configuration?: AskConfiguration
  variables?: Variable[]
}

export interface AskConfiguration {
  openAIApiKey?: string
  bingApiKey?: string
}

export interface AskResult {
  output?: string
  variables?: Variable[]
}

export interface Variable {
  key: string
  value: string
}

export interface Skill {
  name: string
  functions?: Function[]
}

export interface Function {
  name: string
  description?: string
  parameters?: Parameter[]
}

export interface Parameter {
  name: string
  description?: string
  defaultValue?: string
}

export interface SkillsResult {
  skills?: Skill[]
}
