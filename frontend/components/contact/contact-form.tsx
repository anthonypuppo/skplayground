'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useEnterSubmit } from '@/hooks/use-enter-submit'
import { useState } from 'react'
import { IconSpinner } from '@/components/ui/icons'
import { useAppInsightsContext } from '@microsoft/applicationinsights-react-js'
import { toast } from 'sonner'

const contactFormSchema = z.object({
  name: z.string().nonempty(),
  subject: z.string().nonempty(),
  message: z.string().nonempty()
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      subject: '',
      message: ''
    }
  })
  const appInsights = useAppInsightsContext()
  const { formRef, onKeyDown } = useEnterSubmit()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: ContactFormValues) => {
    setIsLoading(true)
    appInsights.trackEvent({
      name: 'ContactFormSubmitted',
      properties: {
        name: data.name,
        subject: data.subject,
        message: data.message
      }
    })

    setTimeout(() => {
      toast.success('Message sent!')
      setIsLoading(false)
      form.reset({
        name: '',
        subject: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-4 py-8 sm:max-w-xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" onKeyDown={onKeyDown} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input autoComplete="off" onKeyDown={onKeyDown} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea onKeyDown={onKeyDown} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <IconSpinner className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}
