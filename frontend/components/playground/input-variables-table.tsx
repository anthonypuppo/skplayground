'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconMoreHorizontal } from '@/components/ui/icons'
import { Variable } from '@/types/semantic-kernel'
import { EditVariableDialog } from '@/components/playground/edit-variable-dialog'
import { RemoveVariableAlertDialog } from '@/components/playground/remove-variable-alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

interface InputVariablesTableProps {
  variables: Variable[]
  editVariable: (variable: Variable) => void
  removeVariable: (variable: Variable) => void
}

export function InputVariablesTable({
  variables,
  editVariable,
  removeVariable
}: InputVariablesTableProps) {
  const defaultVariable: Variable = {
    key: '',
    value: ''
  }
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isRemoveAlertDialogOpen, setIsRemoveAlertDialogOpen] = useState(false)
  const [variableToEdit, setVariableToEdit] = useState({ ...defaultVariable })
  const [variableToRemove, setVariableToRemove] = useState({
    ...defaultVariable
  })

  const copy = (variable: Variable) => copyToClipboard(`{{$${variable.key}}}`)

  const edit = (variable: Variable) => {
    setVariableToEdit(variable)
    setIsEditDialogOpen(true)
  }

  const remove = (variable: Variable) => {
    setVariableToRemove(variable)
    setIsRemoveAlertDialogOpen(true)
  }

  return (
    <div className="h-[calc(24rem-112px)] overflow-y-auto rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-muted">
          <TableRow>
            <TableHead className="font-semibold text-foreground">
              Name
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Value
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {variables.map(variable => (
            <TableRow key={variable.key}>
              <TableCell className="group font-medium">
                {variable.key}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="invisible ml-0.5 h-6 w-6 p-0 group-hover:visible"
                      onClick={() => copy(variable)}
                    >
                      {isCopied ? (
                        <IconCheck className="h-3 w-3 text-green-500 dark:text-green-400" />
                      ) : (
                        <IconCopy className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="max-w-sm truncate">
                {variable.value}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex h-8 w-8 p-0">
                      <IconMoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem onClick={() => edit(variable)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => remove(variable)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditVariableDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        variable={variableToEdit}
        saveVariable={editVariable}
      />
      <RemoveVariableAlertDialog
        isOpen={isRemoveAlertDialogOpen}
        setIsOpen={setIsRemoveAlertDialogOpen}
        variable={variableToRemove}
        removeVariable={removeVariable}
      />
    </div>
  )
}
