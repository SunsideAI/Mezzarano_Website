'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs: FAQ[]
}

export default function FAQSection({
  title = 'Häufig gestellte Fragen',
  subtitle,
  faqs
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-primary-500 mb-4">
            <HelpCircle className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="section-title mb-4">{title}</h2>
          {subtitle && (
            <p className="section-subtitle mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-start justify-between gap-4 p-6 rounded-xl text-left transition-all ${
                  openIndex === index
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
              >
                <span className="font-semibold text-secondary-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-primary-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="bg-white px-6 pb-6 rounded-b-xl -mt-2 pt-2 shadow-lg animate-fade-in">
                  <p className="text-secondary-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
