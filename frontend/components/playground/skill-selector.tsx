'use client'

import { IconCheck, IconChevronsUpDown } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useState } from 'react'
import { useStore } from '@/state'
import { useSkillsApiQuery } from '@/hooks/use-semantic-kernel-api'
import { cn } from '@/lib/utils'
import { Skill } from '@/types/semantic-kernel'

export function SkillSelector() {
  const { selectedSkill, setSelectedSkill, clearSelectedSkill } = useStore(
    state => state.playground
  )
  const { data: skillsResult } = useSkillsApiQuery()
  const [open, setOpen] = useState(false)

  const selectSkill = (skill: Skill) => {
    if (selectedSkill == skill) {
      clearSelectedSkill()
    } else {
      setSelectedSkill(skill)
    }

    setOpen(false)
  }

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="skill">Skill</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          A skill is a reusable unit encapsulating specific AI capabilities.
          Plugins enhance the functionality and interoperability across various
          AI applications such as Semantic Kernel, ChatGPT, Bing, and Microsoft
          365.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between truncate"
          >
            {selectedSkill ? selectedSkill.name : 'Select a skill...'}
            <IconChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <Command loop>
            <CommandInput placeholder="Search skills..." />
            <CommandEmpty>No skills found.</CommandEmpty>
            <CommandGroup>
              {skillsResult?.skills?.map(skill => (
                <CommandItem
                  key={skill.name}
                  onSelect={() => selectSkill(skill)}
                >
                  <IconCheck
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedSkill == skill ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {skill.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
