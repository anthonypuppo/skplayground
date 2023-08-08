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

export function BingApiKeySelector() {
  const { bingApiKey, setBingApiKey } = useStore(state => state.playground)
  const [isTextHidden, setIsTextHidden] = useState(true)

  return (
    <div className="grid">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bing-api-key">Bing API Key</Label>
              <a
                href={siteConfig.links.microsoft.bingApiKey}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                <IconExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="relative">
              <Input
                id="bing-api-key"
                type={isTextHidden ? 'password' : 'text'}
                className="pr-[30px]"
                placeholder="Optional"
                autoComplete="off"
                value={bingApiKey}
                onChange={e => setBingApiKey(e.target.value)}
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
          Your Bing Web Search API key is used to make requests to the Bing
          search engine. This key is only used if you&apos;re using the web
          search skill.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
