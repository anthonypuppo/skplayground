'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Variable } from '@/types/semantic-kernel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

const viewVariableFormSchema = z.object({
  name: z
    .string()
    .nonempty()
    .refine(name => !name.includes(' ')),
  value: z.string().nonempty()
})

type ViewVariableFormValues = z.infer<typeof viewVariableFormSchema>

interface ViewVariableDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  variable: Variable
}

export function ViewVariableDialog({
  isOpen,
  setIsOpen,
  variable
}: ViewVariableDialogProps) {
  const form = useForm<ViewVariableFormValues>()

  useEffect(() => {
    form.reset({
      name: variable.key,
      value: variable.value
    })
  }, [variable, form])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onOpenAutoFocus={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>View variable</DialogTitle>
          <DialogDescription>View a variable in the output.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
