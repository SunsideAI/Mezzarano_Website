import { marked } from 'marked'
import { HelpCircle, BookOpen } from 'lucide-react'
import { getRegionContent } from '@/lib/regionen'
import RegionFAQAccordion from './RegionFAQAccordion'
import SchemaMarkup, { generateFAQSchema } from './SchemaMarkup'
import {
  AufEinenBlickRenderer,
  BodenrichtwerteRenderer,
  StadtteileRenderer,
  AblaufRenderer,
  WarumLokalRenderer,
  isAufEinenBlick,
  isBodenrichtwerte,
  isStadtteile,
  isAblaufMitMakler,
  isWarumLokal,
} from './RegionSectionRenderers'

interface Props {
  slug: string
}

interface Section {
  heading: string
  body: string
}

interface FAQItem {
  question: string
  answer: string
}

const FAQ_HEADING_RE = /häufig\s+gestellte\s+fragen|häufige\s+fragen|^faq$/i
const QUELLEN_HEADING_RE = /^quellen$|^quellenverzeichnis$/i

function splitByH2(markdown: string): Section[] {
  const lines = markdown.split('\n')
  const sections: Section[] = []
  let current: Section = { heading: '', body: '' }
  for (const line of lines) {
    const m = line.match(/^##\s+(.+?)\s*$/)
    if (m) {
      if (current.heading || current.body.trim()) sections.push(current)
      current = { heading: m[1], body: '' }
    } else {
      current.body += line + '\n'
    }
  }
  if (current.heading || current.body.trim()) sections.push(current)
  return sections
}

function parseFAQs(body: string): FAQItem[] {
  const lines = body.split('\n')
  const faqs: FAQItem[] = []
  let currentQ = ''
  let currentA = ''
  const flush = () => {
    if (currentQ) faqs.push({ question: currentQ.trim(), answer: currentA.trim() })
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
 * Render a single section — pick the specialised renderer if the heading matches
 * a known pattern, otherwise render as plain prose.
 */
function SectionRouter({ section, alternate }: { section: Section; alternate: boolean }) {
  const { heading, body } = section

  if (isAufEinenBlick(heading)) return <AufEinenBlickRenderer heading={heading} body={body} />
  if (isBodenrichtwerte(heading)) return <BodenrichtwerteRenderer heading={heading} body={body} />
  if (isStadtteile(heading)) return <StadtteileRenderer heading={heading} body={body} />
  if (isAblaufMitMakler(heading)) return <AblaufRenderer heading={heading} body={body} />
  if (isWarumLokal(heading)) return <WarumLokalRenderer heading={heading} body={body} />

  // Fallback: plain prose. Alternate section backgrounds for rhythm.
  const bg = alternate ? 'bg-gray-50' : 'bg-white'
  const md = heading ? `## ${heading}\n\n${body.trim()}\n` : body
  return (
    <section className={`py-10 md:py-16 ${bg}`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: renderMd(md) }} />
        </div>
      </div>
    </section>
  )
}

export default function RegionMarkdownContent({ slug }: Props) {
  const region = getRegionContent(slug)
  if (!region) return null

  const sections = splitByH2(region.content)
  const faqSection = sections.find((s) => FAQ_HEADING_RE.test(s.heading))
  const quellenSection = sections.find((s) => QUELLEN_HEADING_RE.test(s.heading))
  const contentSections = sections.filter((s) => s !== faqSection && s !== quellenSection)

  const faqs: FAQItem[] = faqSection ? parseFAQs(faqSection.body) : []
  const faqsHtml = faqs.map((f) => ({ question: f.question, answer: renderMd(f.answer) }))
  const faqsForSchema = faqs.map((f) => ({
    question: f.question,
    answer: f.answer.replace(/\[\[([^\]]+)\]\]\([^)]+\)/g, '[$1]'),
  }))

  const quellenHtml = quellenSection ? renderMd(quellenSection.body) : ''

  // Alternate prose section backgrounds only among plain-prose sections
  let plainProseIndex = 0

  return (
    <>
      {faqs.length > 0 && <SchemaMarkup data={generateFAQSchema(faqsForSchema)} />}

      {contentSections.map((section, i) => {
        const isPlainProse =
          !isAufEinenBlick(section.heading) &&
          !isBodenrichtwerte(section.heading) &&
          !isStadtteile(section.heading) &&
          !isAblaufMitMakler(section.heading) &&
          !isWarumLokal(section.heading)
        const alt = isPlainProse ? plainProseIndex++ % 2 === 1 : false
        return <SectionRouter key={i} section={section} alternate={alt} />
      })}

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
