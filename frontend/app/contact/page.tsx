import { Metadata } from 'next'
import { ContactForm } from '@/components/contact/contact-form'
import { siteConfig } from '@/lib/site'
import { Balancer } from 'react-wrap-balancer'

export const metadata: Metadata = {
  title: 'Contact'
}

export default function ContactPage() {
  return (
    <div className="container my-8 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
        <p className="max-w-xl text-center text-lg font-normal leading-8 text-muted-foreground">
          <Balancer>
            Send us a message and we&apos;ll get back to you as soon as
            possible. For bug reports and feature requests please use{' '}
            <a
              href={siteConfig.links.gitHub.repo}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </Balancer>
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
