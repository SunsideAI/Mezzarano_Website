import Link from 'next/link'
import Image from 'next/image'
import { MapPin, TrendingUp, Home, Users, Building, ArrowRight, CheckCircle, Phone, Wine, TreeDeciduous } from 'lucide-react'
import SchemaMarkup, { generateFAQSchema } from '@/components/SchemaMarkup'
import FAQSection from '@/components/FAQSection'

export const metadata = {
  title: 'Immobilien Weinsberg | Mezzarano - Leben in der Weinregion',
  description: 'Immobilien in Weinsberg kaufen oder verkaufen. Idyllisches Wohnen in der Weinregion nahe Heilbronn. Kostenlose Beratung vom Wüstenrot Partner.',
  keywords: 'Immobilien Weinsberg, Haus kaufen Weinsberg, Wohnung Weinsberg, Immobilienmakler Weinsberg, Heilbronn Umgebung'
}

const stats = [
  { value: '12.500', label: 'Einwohner' },
  { value: '3.200 €', label: 'Ø Preis/m²' },
  { value: '420.000 €', label: 'Ø Hauspreis' },
  { value: '+5,1%', label: 'Preisentwicklung' },
]

const faqs = [
  {
    question: 'Warum ist Weinsberg bei Familien so beliebt?',
    answer: 'Weinsberg bietet die perfekte Kombination aus ländlicher Idylle und städtischer Nähe. Gute Schulen, Kindergärten, sichere Wohngebiete und die Natur direkt vor der Tür machen es zum idealen Wohnort für Familien.'
  },
  {
    question: 'Wie ist die Verkehrsanbindung von Weinsberg?',
    answer: 'Weinsberg liegt verkehrsgünstig an der A81 und ist über die B39 schnell in Heilbronn. Mit der S-Bahn erreichen Sie Heilbronn in etwa 10 Minuten, Stuttgart in ca. 45 Minuten.'
  },
  {
    question: 'Gibt es in Weinsberg Neubaugebiete?',
    answer: 'Ja, Weinsberg entwickelt sich stetig weiter. Es gibt regelmäßig neue Baugebiete. Wir informieren Sie gerne über aktuelle Neubau-Projekte und verfügbare Grundstücke.'
  },
  {
    question: 'Was kostet ein Einfamilienhaus in Weinsberg?',
    answer: 'Die Preise für Einfamilienhäuser in Weinsberg liegen je nach Lage, Größe und Zustand zwischen 380.000 € und 650.000 €. Neubauten und Top-Lagen können auch darüber liegen.'
  },
]

export default function WeinsbergPage() {
  return (
    <>
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-primary-400 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Weinsberg bei Heilbronn</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Immobilien in Weinsberg
                </h1>
                <p className="text-xl text-secondary-300 mb-8">
                  Leben in der Weinregion – wo Natur und Familie im Mittelpunkt stehen.
                  Entdecken Sie charmante Immobilien im idyllischen Weinsberg.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/kontakt" className="btn-primary">
                    Kostenlose Beratung
                  </Link>
                  <Link href="/immobilien?location=weinsberg" className="btn-outline">
                    Immobilien ansehen
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-secondary-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="section-title mb-6">
                  Weinsberg – Idylle vor den Toren Heilbronns
                </h2>
                <p className="text-secondary-600 mb-6">
                  Weinsberg ist mehr als nur ein Vorort von Heilbronn. Die charmante Kleinstadt
                  mit ihrer historischen Burgruine Weibertreu und den umliegenden Weinbergen
                  bietet eine einzigartige Lebensqualität.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Wine className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Weinregion</h4>
                      <p className="text-sm text-secondary-600">Traditionsreicher Weinbau</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TreeDeciduous className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Natur pur</h4>
                      <p className="text-sm text-secondary-600">Wanderwege & Naherholung</p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    'Nur 10 Minuten nach Heilbronn',
                    'Ausgezeichnete Infrastruktur für Familien',
                    'Historischer Stadtkern mit Flair',
                    'Attraktive Baugebiete verfügbar',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                    alt="Weinsberg Landschaft"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Weinsberg */}
        <section className="py-20 bg-secondary-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Warum Weinsberg?</h2>
              <p className="section-subtitle mx-auto">
                Die perfekte Balance zwischen ländlicher Ruhe und urbanem Komfort
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Familienfreundlich
                </h3>
                <p className="text-secondary-600">
                  Kindergärten, Grund- und weiterführende Schulen, Sportvereine und
                  sichere Spielplätze – alles für ein gutes Aufwachsen.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="h-7 w-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Wertstabil
                </h3>
                <p className="text-secondary-600">
                  Die Immobilienpreise in Weinsberg entwickeln sich stabil positiv.
                  Eine Investition mit Perspektive.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <Home className="h-7 w-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary-900 mb-3">
                  Mehr Platz
                </h3>
                <p className="text-secondary-600">
                  Größere Grundstücke und mehr Wohnfläche als in der Großstadt –
                  zu faireren Preisen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection
          title="Häufige Fragen zu Immobilien in Weinsberg"
          faqs={faqs}
        />

        {/* CTA */}
        <section className="py-20 bg-primary-500">
          <div className="container-custom text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Ihr Traumhaus in Weinsberg wartet
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Lassen Sie sich von uns beraten und finden Sie Ihr neues Zuhause
              im schönen Weinsberg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="btn-primary bg-white text-primary-500 hover:bg-secondary-100">
                Beratungstermin vereinbaren
              </Link>
              <a href="tel:+4971311234567" className="btn-outline flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                +49 7131 123 4567
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
