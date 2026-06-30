import { notFound } from 'next/navigation'
import Link from 'next/link'
import { marked } from 'marked'
import { BookOpen, Home, ChevronRight, ArrowRight } from 'lucide-react'
import { GLOSSAR, termBySlug, nachbarn } from '@/lib/glossar'

const SITE_URL = 'https://mezzarano-wuestenrot-immobilien.de'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return GLOSSAR.map((t) => ({ slug: t.slug }))
}

function buildKurz(definition: string): string {
  return definition
    .replace(/[#*_`>\n-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
}

export function generateMetadata({ params }: Props) {
  const term = termBySlug(params.slug)
  if (!term) {
    return {
      title: 'Begriff nicht gefunden | Immobilien-ABC',
    }
  }
  const kurz = buildKurz(term.definition)
  const description = term.untertitel ? `${term.begriff}: ${term.untertitel}. ${kurz}` : kurz
  return {
    title: `${term.begriff} – Immobilien-ABC | Mezzarano Immobilien`,
    description,
    alternates: {
      canonical: `${SITE_URL}/immobilien-abc/${term.slug}`,
    },
  }
}

export default function GlossarTermPage({ params }: Props) {
  const term = termBySlug(params.slug)
  if (!term) notFound()

  const html = marked.parse(term.definition, { async: false }) as string
  const related = nachbarn(term.slug, 8)
  const kurz = buildKurz(term.definition)

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.begriff,
    description: term.untertitel || kurz,
    inDefinedTermSet: `${SITE_URL}/immobilien-abc`,
    url: `${SITE_URL}/immobilien-abc/${term.slug}`,
    inLanguage: 'de',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-wuestennacht text-white py-12 md:py-16">
        <div className="container-custom">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70 flex-wrap">
              <li className="flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  Start
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="flex items-center gap-2">
                <Link href="/immobilien-abc" className="hover:text-white transition-colors">
                  Immobilien-ABC
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white truncate">{term.begriff}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 text-wuestenrot mb-3">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Immobilien-ABC</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{term.begriff}</h1>
          {term.untertitel && (
            <p className="text-lg md:text-xl text-white/85 max-w-3xl">{term.untertitel}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Definition */}
          <article
            className="prose-blog prose prose-lg max-w-none
              prose-headings:text-wuestennacht
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-7 prose-h4:mb-2
              prose-p:text-base prose-p:leading-relaxed prose-p:text-wuestennacht
              prose-strong:text-wuestennacht prose-strong:font-bold
              prose-a:text-wuestenrot prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-ol:my-4
              prose-li:my-1.5 prose-li:text-wuestennacht
              prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:p-3 prose-th:bg-warmgrau
              prose-td:border prose-td:border-gray-300 prose-td:p-3"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Sidebar */}
          <aside className="border border-gray-200 p-7 lg:sticky lg:top-32 bg-white">
            <div className="text-xs font-bold uppercase tracking-wider text-wuestennacht-light mb-4">
              Weitere Begriffe
            </div>
            {related.length > 0 ? (
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {related.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/immobilien-abc/${t.slug}`}
                      className="text-wuestennacht hover:text-wuestenrot text-[15px] no-underline transition-colors block"
                    >
                      {t.begriff}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-wuestennacht-light">Keine weiteren Begriffe verfügbar.</p>
            )}
            <Link
              href="/immobilien-abc"
              className="inline-flex items-center gap-1 mt-6 text-sm font-bold text-wuestenrot hover:text-wuestenrot-hover transition-colors"
            >
              Alle Begriffe (A–Z)
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-warmgrau py-14">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-wuestennacht mb-3">
            Persönliche Beratung zu „{term.begriff}"?
          </h2>
          <p className="text-base md:text-lg text-wuestennacht-light mb-6">
            Ich helfe Ihnen unverbindlich und kostenfrei weiter – telefonisch oder vor Ort.
          </p>
          <Link href="/kontakt" className="btn-primary inline-flex">
            Beratung anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* JSON-LD DefinedTerm */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
    </div>
  )
}
