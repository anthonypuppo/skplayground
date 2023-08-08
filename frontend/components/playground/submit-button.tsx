'use client'

import { useStore } from '@/state'
import { Button } from '@/components/ui/button'
import { IconSpinner } from '@/components/ui/icons'
import { useSemanticKernelHubContext } from '@/components/providers/semantic-kernel-hub-provider'
import { NotificationType } from '@/types/notification'
import { utcSeconds } from '@/lib/utils'
import { Ask } from '@/types/semantic-kernel'

export function SubmitButton() {
  const {
    isLoading,
    setIsLoading,
    openAIApiKey,
    bingApiKey,
    selectedFunction,
    selectedSkill,
    input,
    inputVariables,
    setOutput,
    setOutputVariables
  } = useStore(state => state.playground)
  const pushNotification = useStore(
    state => state.notifications.pushNotification
  )
  const { invokeFunction } = useSemanticKernelHubContext()

  const submit = () => {
    if (!openAIApiKey) {
      pushNotification({
        type: NotificationType.Error,
        title: 'OpenAI API key is required.',
        message: 'Please enter your OpenAI API key.',
        utcSeconds: utcSeconds()
      })
    }

    if (!selectedSkill || !selectedFunction) {
      pushNotification({
        type: NotificationType.Error,
        title: 'Skill and function are required.',
        message: 'Please select a skill and a function.',
        utcSeconds: utcSeconds()
      })
    }

    const ask: Ask = {
      input: input,
      configuration: {
        openAIApiKey: openAIApiKey,
        bingApiKey: bingApiKey
      },
      variables: inputVariables
    }

    setIsLoading(true)
    invokeFunction(selectedSkill!.name, selectedFunction!.name, ask).subscribe({
      next: response => {
        setOutput(response.output ?? '')
        setOutputVariables(response.variables ?? [])
      },
      error: err => {
        pushNotification({
          type: NotificationType.Error,
          title: 'Sorry, an error occurred.',
          message: err.message,
          utcSeconds: utcSeconds()
        })
        setIsLoading(false)
      },
      complete: () => {
        setIsLoading(false)
      }
    })
  }

  return (
    <Button className="w-full" onClick={submit} disabled={isLoading}>
      {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? 'Loading...' : 'Submit'}
    </Button>
  )
}
