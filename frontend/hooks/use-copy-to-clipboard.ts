'use client'

import { RefObject, useState } from 'react'

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setCopied] = useState(false)

  const copyToClipboard = (value: string | RefObject<HTMLElement>) => {
    if (!navigator.clipboard.writeText) {
      return
    }

    let text = ''

    if (typeof value === 'string') {
      text = value
    } else if (value.current) {
      const innerHtml = value.current.innerHTML
      const doc = new DOMParser().parseFromString(innerHtml, 'text/html')

      text = doc.body.textContent || ''
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
