import Link from 'next/link'
import { BookOpen, Home, ChevronRight } from 'lucide-react'
import { GLOSSAR, LETTERS, gruppiertNachBuchstabe } from '@/lib/glossar'
import ImmobilienABCContent from '@/components/ImmobilienABCContent'

export const metadata = {
  title: 'Immobilien-ABC: 624 Fachbegriffe verständlich erklärt | Mezzarano Immobilien',
  description: `Das Immobilien-ABC von Mezzarano Immobilien: ${GLOSSAR.length} Fachbegriffe rund um Kauf, Verkauf, Vermietung, Bewertung und Finanzierung verständlich erklärt – von A bis Z.`,
  keywords: 'Immobilien Lexikon, Immobilien Fachbegriffe, Immobilien ABC, Glossar Immobilien, Immobilien Wissen',
}

export default function ImmobilienABCPage() {
  const groups = gruppiertNachBuchstabe()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-wuestennacht text-white py-16 md:py-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <Home className="h-3.5 w-3.5" />
                  Start
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="flex items-center gap-2">
                <Link href="/ratgeber" className="hover:text-white transition-colors">
                  Ratgeber
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white">Immobilien-ABC</li>
            </ol>
          </nav>

          <div className="flex items-center gap-2 text-wuestenrot mb-4">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Immobilien-ABC
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed">
            Erläuterungen zu den wichtigsten Begriffen rund um die Immobilie, von A bis Z.{' '}
            <strong className="text-white">{GLOSSAR.length} Fachbegriffe</strong> verständlich erklärt – für Eigentümer, Käufer und Mieter im Raum Trier, Hermeskeil und Mosel.
          </p>
        </div>
      </section>

      {/* JSON-LD: DefinedTermSet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            name: 'Immobilien-ABC',
            description: `Glossar mit ${GLOSSAR.length} Fachbegriffen rund um Immobilien.`,
            url: 'https://mezzarano-wuestenrot-immobilien.de/immobilien-abc',
            inLanguage: 'de',
          }),
        }}
      />

      <ImmobilienABCContent
        letters={LETTERS}
        groups={groups}
        totalTerms={GLOSSAR.length}
      />

      {/* CTA */}
      <section className="bg-warmgrau py-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-wuestennacht mb-4">
            Fragen zu einem konkreten Begriff?
          </h2>
          <p className="text-lg text-wuestennacht-light mb-8">
            Rufen Sie mich an oder schreiben Sie mir – ich berate Sie unverbindlich und kostenfrei.
          </p>
          <Link href="/kontakt" className="btn-primary inline-flex">
            Beratung anfragen
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
