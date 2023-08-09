'use client'

import { useStore } from '@/state'
import { InputVariablesTable } from '@/components/playground/input-variables-table'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconChevronDown, IconPlusCircle } from '@/components/ui/icons'
import { AddVariableDialog } from '@/components/playground/add-variable-dialog'
import { Variable } from '@/types/semantic-kernel'
import { cn } from '@/lib/utils'
import { Kbd } from '@/components/ui/kbd'

export function InputVariables() {
  const {
    selectedSkill,
    selectedFunction,
    inputVariables,
    addInputVariable,
    editInputVariable,
    removeInputVariable
  } = useStore(state => state.playground)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [variableToAdd, setVariableToAdd] = useState<Variable>({
    key: '',
    value: ''
  })

  const add = (defaultValues: Variable) => {
    setVariableToAdd(defaultValues)
    setIsAddDialogOpen(true)
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <span>
          Reference variables in the input using the{' '}
          <Kbd>{'{{$variable}}'}</Kbd> syntax.
        </span>
        <div
          className={cn(
            buttonVariants({ size: 'sm' }),
            'flex items-center px-0'
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="shadow-none hover:bg-transparent hover:text-primary-foreground"
            onClick={() =>
              add({
                key: '',
                value: ''
              })
            }
          >
            <IconPlusCircle className="mr-2 h-4 w-4" />
            Add variable
          </Button>
          {selectedSkill &&
            selectedFunction &&
            !!selectedFunction.parameters?.filter(
              a =>
                a.name.toLowerCase() != 'input' &&
                !inputVariables.find(b => b.key == a.name)
            ).length && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shadow-none hover:bg-transparent hover:text-primary-foreground"
                    >
                      <IconChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    className="w-[200px]"
                    forceMount
                  >
                    <DropdownMenuLabel>
                      {selectedSkill.name}.{selectedFunction.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {selectedFunction.parameters &&
                      selectedFunction.parameters
                        .filter(
                          a =>
                            a.name.toLowerCase() != 'input' &&
                            !inputVariables.find(b => b.key == a.name)
                        )
                        .map(parameter => (
                          <DropdownMenuItem
                            key={parameter.name}
                            onClick={() =>
                              add({
                                key: parameter.name,
                                value: ''
                              })
                            }
                          >
                            {parameter.name}
                          </DropdownMenuItem>
                        ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
        </div>
      </div>
      <AddVariableDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        variable={variableToAdd}
        saveVariable={addInputVariable}
      />
      <InputVariablesTable
        variables={inputVariables}
        editVariable={editInputVariable}
        removeVariable={removeInputVariable}
      />
    </div>
  )
}
