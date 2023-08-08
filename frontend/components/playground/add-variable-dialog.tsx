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
import { Kbd } from '@/components/ui/kbd'
import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { useEffect } from 'react'

const addVariableFormSchema = z.object({
  name: z
    .string()
    .nonempty()
    .refine(name => !name.includes(' ')),
  value: z.string().nonempty()
})

type AddVariableFormValues = z.infer<typeof addVariableFormSchema>

interface AddVariableDialogProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  variable: Variable
  saveVariable: (variable: Variable) => void
}

export function AddVariableDialog({
  isOpen,
  setIsOpen,
  variable,
  saveVariable
}: AddVariableDialogProps) {
  const form = useForm<AddVariableFormValues>({
    resolver: zodResolver(addVariableFormSchema)
  })
  const { formRef, onKeyDown } = useEnterSubmit()

  const onSubmit = (data: AddVariableFormValues) => {
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
          <DialogTitle>Add variable</DialogTitle>
          <DialogDescription>
            Add a new variable. Click save when you&apos;re done.
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
                    <Input onKeyDown={onKeyDown} {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the variable. Names should be unique, if one is
                    added with the same name as an existing one, the existing
                    one will be overwritten.
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
                  <FormDescription>
                    The value of the variable. Press <Kbd>Shift+Enter</Kbd> to
                    insert a newline.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button onClick={form.handleSubmit(onSubmit)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
