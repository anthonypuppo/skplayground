'use client'

import { IconChevronsUpDown, IconCheck } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useMutationObserver } from '@/hooks/use-mutation-observer'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
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
import { useRef, useState } from 'react'
import { Function } from '@/types/semantic-kernel'
import { useStore } from '@/state'
import { Badge } from '@/components/ui/badge'

export function FunctionSelector() {
  const { selectedSkill, selectedFunction, setSelectedFunction } = useStore(
    state => state.playground
  )
  const [open, setOpen] = useState(false)
  const [peekedFunction, setPeekedFunction] = useState<Function>()

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Function</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          A function within a skill provides a specific operation that the AI
          can execute. It can be a Semantic Function interpreting user requests
          and responding using natural language, or a Native Function, directly
          invoking code for tasks like data manipulation or calculations.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a function"
            className="w-full justify-between truncate"
            disabled={!selectedSkill}
          >
            {selectedFunction ? selectedFunction.name : 'Select a function...'}
            <IconChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent side="left" align="start" forceMount>
              <div className="grid gap-2">
                <h4 className="truncate font-medium leading-none">
                  {peekedFunction?.name}
                </h4>
                <div className="text-sm text-muted-foreground">
                  {peekedFunction?.description}
                </div>
              </div>
              {!!peekedFunction?.parameters?.filter(
                x => x.name.toLowerCase() != 'input'
              ).length && (
                <div className="flex flex-row flex-wrap">
                  {peekedFunction.parameters
                    .filter(x => x.name.toLowerCase() != 'input')
                    .map(param => (
                      <Badge
                        key={param.name}
                        variant="secondary"
                        className="mr-1 mt-2"
                      >
                        {param.name}
                      </Badge>
                    ))}
                </div>
              )}
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search functions..." />
                <CommandEmpty>No functions found.</CommandEmpty>
                <HoverCardTrigger />
                <CommandGroup>
                  {selectedSkill?.functions?.map(item => (
                    <ModelItem
                      key={item.name}
                      item={item}
                      isSelected={selectedFunction === item}
                      onPeek={item => setPeekedFunction(item)}
                      onSelect={() => {
                        setSelectedFunction(item)
                        setOpen(false)
                      }}
                    />
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface FunctionItemProps {
  item: Function
  isSelected: boolean
  onSelect: () => void
  onPeek: (item: Function) => void
}

function ModelItem({ item, isSelected, onSelect, onPeek }: FunctionItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(ref, mutations => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'aria-selected' &&
        ref.current?.getAttribute('aria-selected')
      ) {
        onPeek(item)
      }
    }
  })

  return (
    <CommandItem
      key={item.name}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      <IconCheck
        className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
      <span className="truncate">{item.name}</span>
    </CommandItem>
  )
}
