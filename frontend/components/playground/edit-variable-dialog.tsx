'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Variable } from '@/types/semantic-kernel'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEffect } from 'react'
import { useEnterSubmit } from '@/hooks/use-enter-submit'

const editVariableFormSchema = z.object({
  name: z
    .string()
    .nonempty()
    .refine(name => !name.includes(' ')),
  value: z.string().nonempty()
})

type EditVariableFormValues = z.infer<typeof editVariableFormSchema>

interface EditVariableDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  variable: Variable
  saveVariable: (variable: Variable) => void
}

export function EditVariableDialog({
  isOpen,
  setIsOpen,
  variable,
  saveVariable
}: EditVariableDialogProps) {
  const form = useForm<EditVariableFormValues>({
    resolver: zodResolver(editVariableFormSchema)
  })
  const { formRef, onKeyDown } = useEnterSubmit()

  const onSubmit = (data: EditVariableFormValues) => {
    saveVariable({
      key: data.name,
      value: data.value
    })
    setIsOpen(false)
  }

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
          <DialogTitle>Edit variable</DialogTitle>
          <DialogDescription>
            Make changes to the variable. Click save changes when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    If you need to change the name, delete the current variable
                    and add a new one from the table view.
                  </FormDescription>
                  <FormMessage />
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
                    <Textarea
                      className="resize-none"
                      onKeyDown={onKeyDown}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
