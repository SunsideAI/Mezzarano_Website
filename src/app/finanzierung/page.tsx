import Link from 'next/link'
import {
  Banknote,
  Calculator,
  PiggyBank,
  Shield,
  TrendingDown,
  Home,
  FileCheck,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Building2,
  Percent,
  Clock
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baufinanzierung & Immobilienfinanzierung | Mezzarano Immobilien',
  description: 'Baufinanzierung in Hermeskeil, Trier & Mosel. Als Wüstenrot-Partner bieten wir Ihnen günstige Zinsen, KfW-Förderung und persönliche Beratung für Ihre Immobilienfinanzierung.',
}

const finanzierungsarten = [
  {
    icon: Home,
    title: 'Baufinanzierung',
    description: 'Klassische Immobilienfinanzierung für Ihr Eigenheim - mit günstigen Zinsen und langen Laufzeiten.',
  },
  {
    icon: PiggyBank,
    title: 'Bausparvertrag',
    description: 'Staatlich gefördert mit Wohnungsbauprämie - ideal für die Zukunftsplanung und Zinssicherung.',
  },
  {
    icon: TrendingDown,
    title: 'KfW-Förderung',
    description: 'Attraktive Förderprogramme für energieeffizientes Bauen und Sanieren mit Tilgungszuschüssen.',
  },
  {
    icon: Building2,
    title: 'Anschlussfinanzierung',
    description: 'Optimale Konditionen für die Weiterfinanzierung Ihres bestehenden Darlehens.',
  },
]

const processSteps = [
  {
    step: '01',
    icon: Calculator,
    title: 'Bedarfsanalyse',
    description: 'Gemeinsam ermitteln wir Ihr Budget, Ihre Wünsche und die optimale Finanzierungssumme für Ihr Vorhaben.',
  },
  {
    step: '02',
    icon: FileCheck,
    title: 'Angebote vergleichen',
    description: 'Wir prüfen über 400 Banken und Sparkassen, um für Sie die besten Konditionen zu finden.',
  },
  {
    step: '03',
    icon: Percent,
    title: 'Förderungen nutzen',
    description: 'Wir identifizieren alle verfügbaren KfW-Programme und Fördermittel für Ihre Situation.',
  },
  {
    step: '04',
    icon: Shield,
    title: 'Finanzierung sichern',
    description: 'Nach Ihrer Zusage begleiten wir Sie bis zur Auszahlung und darüber hinaus.',
  },
]

const vorteile = [
  'Zugang zu über 400 Banken & Sparkassen',
  'Unabhängige Beratung ohne Bankbindung',
  'Kombination mit Wüstenrot Bausparverträgen',
  'KfW-Förderung optimal einsetzen',
  'Persönliche Betreuung vor Ort',
  'Keine versteckten Kosten',
  'Schnelle Zusage durch Direktanbindung',
  'Langjährige Erfahrung in der Region',
]

const zinssaetze = [
  { laufzeit: '5 Jahre', zins: 'ab 3,2%', empfehlung: false },
  { laufzeit: '10 Jahre', zins: 'ab 3,4%', empfehlung: true },
  { laufzeit: '15 Jahre', zins: 'ab 3,6%', empfehlung: false },
  { laufzeit: '20 Jahre', zins: 'ab 3,8%', empfehlung: false },
]

export default function FinanzierungPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="h-[400px] md:h-[480px] bg-secondary-900 flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary-400 mb-4" data-aos="fade-up">
              <Banknote className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Finanzierung</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-aos="fade-up" data-aos-delay="100">
              Ihre Baufinanzierung – persönlich & unabhängig
            </h1>
            <p className="text-xl text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="200">
              Als Wüstenrot-Partner biete ich Ihnen Zugang zu über 400 Banken und finde die optimale Finanzierung für Ihre Traumimmobilie in der Region Trier-Mosel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Kostenlose Beratung anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900">
                <Phone className="h-5 w-5 mr-2" />
                0177 6542977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Finanzierungsarten */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">Unsere Finanzierungslösungen</h2>
            <p className="section-subtitle mx-auto">
              Maßgeschneiderte Finanzierungen für jeden Bedarf
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {finanzierungsarten.map((item, index) => (
              <div
                key={item.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aktuelle Zinsen */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="section-title mb-6">Aktuelle Zinsen</h2>
              <p className="text-secondary-600 mb-8">
                Die Zinsen für Baufinanzierungen sind aktuell wieder attraktiver. Sichern Sie sich jetzt
                günstige Konditionen für Ihr Vorhaben. Als Ihr Wüstenrot-Partner vergleiche ich für Sie
                über 400 Anbieter und finde die beste Lösung.
              </p>

              <div className="space-y-4">
                {zinssaetze.map((item) => (
                  <div
                    key={item.laufzeit}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      item.empfehlung
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-secondary-400" />
                      <span className="font-medium text-secondary-900">{item.laufzeit} Zinsbindung</span>
                      {item.empfehlung && (
                        <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
                          Empfohlen
                        </span>
                      )}
                    </div>
                    <span className="text-xl font-bold text-primary-600">{item.zins}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-secondary-500 mt-4">
                * Beispielhafte Zinssätze, abhängig von Bonität und Beleihungsauslauf.
                Stand: Februar 2026. Unverbindlich.
              </p>
            </div>

            <div className="bg-secondary-900 text-white p-8 md:p-10 rounded-2xl" data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-6">Schnell-Check: Was kann ich mir leisten?</h3>

              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">Monatliche Rate</div>
                  <div className="text-3xl font-bold text-primary-400">1.500 €</div>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <ArrowRight className="h-5 w-5 text-primary-400" />
                  <span>entspricht ca.</span>
                </div>

                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">Möglicher Kaufpreis</div>
                  <div className="text-3xl font-bold text-primary-400">~ 350.000 €</div>
                </div>

                <p className="text-sm text-gray-400">
                  Bei 10 Jahren Zinsbindung, 2% Tilgung und durchschnittlichen Konditionen.
                  Individuelle Berechnung auf Anfrage.
                </p>
              </div>

              <Link
                href="/kontakt"
                className="btn-primary w-full mt-6 justify-center"
              >
                Individuelles Angebot anfordern
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prozess */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="section-title mb-4">So läuft Ihre Finanzierung ab</h2>
            <p className="section-subtitle mx-auto">
              In vier einfachen Schritten zu Ihrer Traumimmobilie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 left-full items-center justify-center w-8 z-0">
                    <div className="w-full h-0.5 bg-primary-300"></div>
                    <div className="absolute w-2 h-2 bg-primary-400 rounded-full"></div>
                  </div>
                )}

                <div className="bg-white rounded-xl p-6 shadow-lg relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 mb-2">{step.title}</h3>
                  <p className="text-secondary-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vorteile */}
      <section className="py-12 md:py-20 bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Warum Ihre Finanzierung bei <span className="text-primary-400">Wüstenrot</span>?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Als unabhängiger Finanzierungsberater vergleiche ich für Sie die Angebote
                von über 400 Banken und Sparkassen. So finden wir gemeinsam die optimale
                Lösung für Ihre persönliche Situation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vorteile.map((vorteil, index) => (
                  <div key={vorteil} className="flex items-start gap-3" data-aos="fade-up" data-aos-delay={index * 50}>
                    <CheckCircle className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{vorteil}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8" data-aos="fade-left">
              <h3 className="text-2xl font-bold mb-6">Kostenlose Erstberatung</h3>
              <p className="text-gray-300 mb-6">
                Lassen Sie uns gemeinsam Ihre Möglichkeiten besprechen. Ich nehme mir Zeit für Sie
                und Ihre Fragen - unverbindlich und kostenfrei.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span>Persönliches Gespräch vor Ort oder online</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-white" />
                  </div>
                  <span>Individuelle Budget-Berechnung</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <FileCheck className="h-4 w-4 text-white" />
                  </div>
                  <span>Konkrete Finanzierungsvorschläge</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt" className="btn-primary flex-1 justify-center">
                  Termin vereinbaren
                </Link>
                <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-secondary-900 flex-1 justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KfW Förderung */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="section-title mb-4">KfW-Förderung nutzen</h2>
              <p className="section-subtitle mx-auto">
                Sparen Sie tausende Euro mit staatlichen Förderprogrammen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
                <div className="text-4xl font-bold text-primary-600 mb-2">300</div>
                <h3 className="font-bold text-secondary-900 mb-2">Wohneigentum für Familien</h3>
                <p className="text-sm text-secondary-600">
                  Bis zu 270.000 € zinsgünstiger Kredit für Familien mit Kindern
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
                <div className="text-4xl font-bold text-primary-600 mb-2">261</div>
                <h3 className="font-bold text-secondary-900 mb-2">Effiziente Gebäude</h3>
                <p className="text-sm text-secondary-600">
                  Bis zu 150.000 € Kredit mit Tilgungszuschuss für energieeffizientes Bauen
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-xl border border-primary-200">
                <div className="text-4xl font-bold text-primary-600 mb-2">124</div>
                <h3 className="font-bold text-secondary-900 mb-2">Wohneigentumsprogramm</h3>
                <p className="text-sm text-secondary-600">
                  Bis zu 100.000 € zinsgünstige Förderung für Kauf oder Bau
                </p>
              </div>
            </div>

            <div className="text-center mt-10" data-aos="fade-up" data-aos-delay="200">
              <p className="text-secondary-600 mb-6">
                Ich prüfe für Sie alle Fördermöglichkeiten und kombiniere sie optimal mit Ihrer Finanzierung.
              </p>
              <Link href="/kontakt" className="btn-secondary">
                Fördercheck starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit für Ihre Traumimmobilie?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Lassen Sie uns gemeinsam die passende Finanzierung für Sie finden.
            Ich freue mich auf Ihre Anfrage!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 group">
              Kostenlose Beratung anfragen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <Phone className="h-5 w-5 mr-2" />
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
