'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Variable } from '@/types/semantic-kernel'

interface RemoveVariableAlertDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  variable: Variable
  removeVariable: (variable: Variable) => void
}

export function RemoveVariableAlertDialog({
  isOpen,
  setIsOpen,
  variable,
  removeVariable
}: RemoveVariableAlertDialogProps) {
  const remove = () => {
    removeVariable(variable)
    setIsOpen(false)
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent onOpenAutoFocus={e => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The variable will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={remove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
