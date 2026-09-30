'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  faqs: FAQItem[]
}

/**
 * FAQ accordion for regional pages. Renders answers as HTML because they
 * originate from server-side marked() output (may contain links, lists, tables).
 */
export default function RegionFAQAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className={`w-full flex items-start justify-between gap-4 p-6 rounded-fenster text-left transition-all ${
                isOpen ? 'bg-white shadow-lg' : 'bg-white/70 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="font-semibold text-wuestennacht pr-4">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-wuestenrot flex-shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div
                className="bg-white px-6 pb-6 rounded-b-fenster -mt-2 pt-2 shadow-lg animate-fade-in prose-blog text-[15px]"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
