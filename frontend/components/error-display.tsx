'use client'

import { Button } from '@/components/ui/button'

interface ErrorDisplayProps {
  title?: string
  error?: string | Error
  reset?: () => void
}

export function ErrorDisplay({
  title = 'Something went wrong',
  error = new Error('Sorry, an unexpected error occurred.'),
  reset
}: ErrorDisplayProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 text-base leading-7">
          {typeof error === 'string'
            ? error
            : error.message || error.toString()}
        </p>
        {reset && (
          <div className="mt-6 flex items-center justify-center">
            <Button onClick={reset}>Try again</Button>
          </div>
        )}
      </div>
    </div>
  )
}
