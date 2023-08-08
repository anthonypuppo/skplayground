'use client'

import { useStore } from '@/state'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '@/components/ui/code-block'
import { HTMLAttributes, useRef } from 'react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy } from '@/components/ui/icons'

export function OutputCard({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const output = useStore(state => state.playground.output)
  const markdownCardRef = useRef<HTMLDivElement>(null)
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  const copy = () => copyToClipboard(markdownCardRef)

  return (
    <Card
      ref={markdownCardRef}
      className="group relative h-[calc(24rem-60px)] cursor-default overflow-y-auto bg-muted/70 p-4"
      {...props}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="invisible absolute right-1.5 top-1.5 h-6 w-6 p-0 text-muted-foreground group-hover:visible"
            onClick={copy}
          >
            {isCopied ? (
              <IconCheck className="h-4 w-4 text-green-500 dark:text-green-400" />
            ) : (
              <IconCopy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy</p>
        </TooltipContent>
      </Tooltip>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        linkTarget="_blank"
        className="prose prose-sm max-w-none break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            return (
              <CodeBlock
                key={Math.random()}
                language={(match && match[1]) || ''}
                value={String(children).replace(/\n$/, '')}
                {...props}
              />
            )
          }
        }}
      >
        {output}
      </ReactMarkdown>
    </Card>
  )
}
