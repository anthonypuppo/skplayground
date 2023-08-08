'use client'

import { useStore } from '@/state'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { siteConfig } from '@/lib/site'
import { IconExternalLink, IconEye, IconEyeOff } from '@/components/ui/icons'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function OpenAIApiKeySelector() {
  const { openAIApiKey, setOpenAIApiKey } = useStore(state => state.playground)
  const [isTextHidden, setIsTextHidden] = useState(true)

  return (
    <div className="grid">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="openai-api-key">OpenAI API Key</Label>
              <a
                href={siteConfig.links.openAI.apiKeys}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                <IconExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="relative">
              <Input
                id="openai-api-key"
                type={isTextHidden ? 'password' : 'text'}
                className="pr-[30px]"
                autoComplete="off"
                value={openAIApiKey}
                onChange={e => setOpenAIApiKey(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  className="mr-2 h-4 p-0 text-muted-foreground hover:bg-background"
                  onClick={() => setIsTextHidden(!isTextHidden)}
                >
                  {isTextHidden ? (
                    <IconEyeOff className="h-4 w-4" />
                  ) : (
                    <IconEye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          Your OpenAI API key is used to make requests to the OpenAI API. You
          can manage your keys using the link button on the right.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
