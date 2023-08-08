import { StateSlice } from '@/state/types'
import {
  PlaygroundStateDefinition,
  PlaygroundStateType
} from '@/state/playground/types'

const initialPlaygroundState: PlaygroundStateDefinition = {
  openAIApiKey: '',
  bingApiKey: '',
  input: '',
  inputVariables: [],
  output: '',
  outputVariables: [],
  isLoading: false
}

export const createPlaygroundState: StateSlice<PlaygroundStateType> = set => ({
  ...initialPlaygroundState,
  setOpenAIApiKey: payload => {
    set(
      state => {
        state.playground.openAIApiKey = payload
      },
      false,
      {
        type: 'playground/setOpenAIApiKey',
        payload
      }
    )
  },
  setBingApiKey: payload => {
    set(
      state => {
        state.playground.bingApiKey = payload
      },
      false,
      {
        type: 'playground/setBingApiKey',
        payload
      }
    )
  },
  setSelectedSkill: payload => {
    set(
      state => {
        state.playground.selectedSkill = payload
        state.playground.selectedFunction = undefined
      },
      false,
      {
        type: 'playground/setSelectedSkill',
        payload
      }
    )
  },
  clearSelectedSkill: () => {
    set(
      state => {
        state.playground.selectedSkill = undefined
        state.playground.selectedFunction = undefined
      },
      false,
      {
        type: 'playground/clearSelectedSkill'
      }
    )
  },
  setSelectedFunction: payload => {
    set(
      state => {
        state.playground.selectedFunction = payload
      },
      false,
      {
        type: 'playground/setSelectedFunction',
        payload
      }
    )
  },
  setInput: payload => {
    set(
      state => {
        state.playground.input = payload
      },
      false,
      {
        type: 'playground/setInput',
        payload
      }
    )
  },
  addInputVariable: payload => {
    set(
      state => {
        state.playground.inputVariables = [
          payload,
          ...state.playground.inputVariables
        ]
      },
      false,
      {
        type: 'playground/addInputVariable',
        payload
      }
    )
  },
  editInputVariable: payload => {
    set(
      state => {
        state.playground.inputVariables = state.playground.inputVariables.map(
          v => (v.key === payload.key ? payload : v)
        )
      },
      false,
      {
        type: 'playground/editInputVariable',
        payload
      }
    )
  },
  removeInputVariable: payload => {
    set(
      state => {
        state.playground.inputVariables =
          state.playground.inputVariables.filter(v => v.key !== payload.key)
      },
      false,
      {
        type: 'playground/removeInputVariable',
        payload
      }
    )
  },
  setOutput: payload => {
    set(
      state => {
        state.playground.output = payload
      },
      false,
      {
        type: 'playground/setOutput',
        payload
      }
    )
  },
  setOutputVariables: payload => {
    set(
      state => {
        state.playground.outputVariables = payload
      },
      false,
      {
        type: 'playground/setOutputVariables',
        payload
      }
    )
  },
  setIsLoading: payload => {
    set(
      state => {
        state.playground.isLoading = payload
      },
      false,
      {
        type: 'playground/setIsLoading',
        payload
      }
    )
  }
})
