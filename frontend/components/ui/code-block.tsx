'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { IconCheck, IconCopy } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  language: string
  value: string
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  const copy = () => copyToClipboard(value)

  return (
    <div className="codeblock relative w-full bg-zinc-950 font-sans">
      <div className="flex w-full items-center justify-between bg-zinc-800 px-6 py-1 pr-4 text-primary-foreground">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent hover:text-muted-foreground"
            onClick={copy}
          >
            {isCopied ? (
              <IconCheck className="h-4 w-4 text-green-500 dark:text-green-400" />
            ) : (
              <IconCopy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)'
          }
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
