import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { faqConfig } from '@/lib/faq'

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="mt-8 w-full sm:max-w-xl">
      {faqConfig.map((faq, index) => (
        <AccordionItem key={faq.question} value={`${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
