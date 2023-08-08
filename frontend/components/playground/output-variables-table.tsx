'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useStore } from '@/state'
import { Button } from '@/components/ui/button'
import { IconEye } from '@/components/ui/icons'
import { ViewVariableDialog } from '@/components/playground/view-variable-dialog'
import { useState } from 'react'
import { Variable } from '@/types/semantic-kernel'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function OutputVariablesTable() {
  const variables = useStore(state => state.playground.outputVariables)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [variableToView, setVariableToView] = useState<Variable>({
    key: '',
    value: ''
  })

  const view = (variable: Variable) => {
    setVariableToView(variable)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="h-[calc(24rem-60px)] overflow-y-auto rounded-md border">
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
              </TableCell>
              <TableCell className="max-w-sm truncate">
                {variable.value}
              </TableCell>
              <TableCell>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex h-8 w-8 p-0"
                      onClick={() => view(variable)}
                    >
                      <IconEye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewVariableDialog
        isOpen={isViewDialogOpen}
        setIsOpen={setIsViewDialogOpen}
        variable={variableToView}
      />
    </div>
  )
}
