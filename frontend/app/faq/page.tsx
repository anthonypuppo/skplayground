import { Metadata } from 'next'
import { FaqAccordion } from '@/components/faq/faq-accordion'

export const metadata: Metadata = {
  title: 'FAQ'
}

export default function FaqPage() {
  return (
    <div className="container my-8 flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
      </div>
      <FaqAccordion />
    </div>
  )
}
