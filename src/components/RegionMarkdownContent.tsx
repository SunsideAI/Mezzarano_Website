import { marked } from 'marked'
import { HelpCircle, BookOpen } from 'lucide-react'
import { getRegionContent } from '@/lib/regionen'
import RegionFAQAccordion from './RegionFAQAccordion'
import SchemaMarkup, { generateFAQSchema } from './SchemaMarkup'

interface Props {
  slug: string
}

interface Section {
  heading: string
  headingId: string
  body: string
}

interface FAQItem {
  question: string
  answer: string
}

const FAQ_HEADING_RE = /häufig\s+gestellte\s+fragen|^faq$/i
const QUELLEN_HEADING_RE = /^quellen$|^quellenverzeichnis$/i

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Split markdown into ordered H2 sections.
 * Everything before the first H2 becomes an "intro" section with heading = ''.
 */
function splitByH2(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let current: Section = { heading: '', headingId: '', body: '' }

  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) {
      if (current.heading || current.body.trim()) sections.push(current)
      current = { heading: m[1], headingId: slugifyHeading(m[1]), body: '' }
    } else {
      current.body += line + '\n'
    }
  }
  if (current.heading || current.body.trim()) sections.push(current)
  return sections
}

/**
 * Given the body of the FAQ H2 section, extract Q/A pairs from ### headings.
 * The answer is all text between one H3 and the next.
 */
function parseFAQs(body: string): FAQItem[] {
  const lines = body.split('\n')
  const faqs: FAQItem[] = []
  let currentQ = ''
  let currentA = ''

  const flush = () => {
    if (currentQ) {
      faqs.push({ question: currentQ.trim(), answer: currentA.trim() })
    }
  }

  for (const line of lines) {
    const m = line.match(/^###\s+(.+?)\s*$/)
    if (m) {
      flush()
      currentQ = m[1]
      currentA = ''
    } else if (currentQ) {
      currentA += line + '\n'
    }
  }
  flush()
  return faqs
}

function renderMd(md: string): string {
  return marked.parse(md, { async: false, gfm: true, breaks: false }) as string
}

/**
 * Reassemble ordinary sections (non-FAQ, non-Quellen) back to markdown.
 */
function sectionToMarkdown(s: Section): string {
  const head = s.heading ? `## ${s.heading}\n\n` : ''
  return head + s.body.trim() + '\n'
}

export default function RegionMarkdownContent({ slug }: Props) {
  const region = getRegionContent(slug)
  if (!region) return null

  const sections = splitByH2(region.content)

  // Isolate special sections
  const faqSection = sections.find((s) => FAQ_HEADING_RE.test(s.heading))
  const quellenSection = sections.find((s) => QUELLEN_HEADING_RE.test(s.heading))
  const proseSections = sections.filter((s) => s !== faqSection && s !== quellenSection)

  // Split prose around FAQ so the FAQ can sit in its own visual block
  const faqIndex = faqSection ? sections.indexOf(faqSection) : -1
  const proseBeforeFaq =
    faqIndex >= 0
      ? proseSections.filter((s) => sections.indexOf(s) < faqIndex)
      : proseSections.filter((s) => s !== quellenSection)
  const proseAfterFaq =
    faqIndex >= 0
      ? proseSections.filter((s) => sections.indexOf(s) > faqIndex && s !== quellenSection)
      : []

  const beforeHtml = renderMd(proseBeforeFaq.map(sectionToMarkdown).join('\n'))
  const afterHtml = renderMd(proseAfterFaq.map(sectionToMarkdown).join('\n'))
  const quellenHtml = quellenSection ? renderMd(quellenSection.body) : ''

  const faqs: FAQItem[] = faqSection ? parseFAQs(faqSection.body) : []
  // Render each FAQ answer to HTML so the accordion can display links, lists, etc.
  const faqsHtml = faqs.map((f) => ({
    question: f.question,
    answer: renderMd(f.answer),
  }))
  // Plain-text version for JSON-LD FAQPage schema (strip HTML tags)
  const faqsForSchema = faqs.map((f) => ({
    question: f.question,
    answer: f.answer.replace(/\[\[([^\]]+)\]\]\([^)]+\)/g, '[$1]'), // shorten [[n]](url) → [n]
  }))

  return (
    <>
      {faqs.length > 0 && <SchemaMarkup data={generateFAQSchema(faqsForSchema)} />}

      {/* Long-form prose (part 1) */}
      {beforeHtml && (
        <section className="py-10 md:py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: beforeHtml }}
              />
            </div>
          </div>
        </section>
      )}

      {/* FAQ as accordion — reuses the site's existing FAQ visual language */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-warmgrau">
          <div className="container-custom">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 text-wuestenrot mb-4">
                <HelpCircle className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">FAQ</span>
              </div>
              <h2 className="section-title mb-4">{faqSection!.heading}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <RegionFAQAccordion faqs={faqsHtml} />
            </div>
          </div>
        </section>
      )}

      {/* Long-form prose (part 2) — anything between FAQ and Quellen */}
      {afterHtml && (
        <section className="py-10 md:py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: afterHtml }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Quellen — collapsed by default to save space */}
      {quellenHtml && (
        <section className="py-10 md:py-14 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <details className="group bg-white border border-gray-200 rounded-fenster p-6">
                <summary className="flex items-center gap-3 cursor-pointer list-none">
                  <BookOpen className="h-5 w-5 text-wuestenrot flex-shrink-0" />
                  <span className="font-semibold text-wuestennacht">{quellenSection!.heading}</span>
                  <span className="ml-auto text-sm text-wuestennacht-light group-open:hidden">Anzeigen</span>
                  <span className="ml-auto text-sm text-wuestennacht-light hidden group-open:inline">Ausblenden</span>
                </summary>
                <div
                  className="prose-blog mt-6 text-sm"
                  dangerouslySetInnerHTML={{ __html: quellenHtml }}
                />
              </details>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
