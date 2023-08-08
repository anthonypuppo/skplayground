'use client'

import { useRef, KeyboardEvent } from 'react'

export function useEnterSubmit() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit()
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
