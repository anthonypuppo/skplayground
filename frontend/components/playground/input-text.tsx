'use client'

import { Textarea } from '@/components/ui/textarea'
import { useStore } from '@/state'
import { Kbd } from '@/components/ui/kbd'
import { siteConfig } from '@/lib/site'

export function InputText() {
  const { input, setInput } = useStore(state => state.playground)

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <span>
          Will be passed as the <Kbd>{'{{$input}}'}</Kbd> variable.{' '}
          <a
            href={siteConfig.links.microsoft.promptTemplateSyntax}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Learn more
          </a>{' '}
          about the prompt template syntax.
        </span>
      </div>
      <Textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 resize-none"
      />
    </div>
  )
}
