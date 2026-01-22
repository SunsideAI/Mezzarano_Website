import Link from 'next/link'
import Image from 'next/image'
import { Search, Home, Key, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import { getFeaturedProperties } from '@/data/properties'

const services = [
  {
    icon: Home,
    title: 'Immobilien kaufen',
    description: 'Finden Sie Ihr Traumhaus aus unserem exklusiven Portfolio an Häusern, Wohnungen und Villen.',
  },
  {
    icon: Key,
    title: 'Immobilien mieten',
    description: 'Hochwertige Mietobjekte in besten Lagen - von der Stadtwohnung bis zum Einfamilienhaus.',
  },
  {
    icon: TrendingUp,
    title: 'Immobilienbewertung',
    description: 'Professionelle Wertermittlung durch zertifizierte Gutachter für Ihre Immobilie.',
  },
  {
    icon: Users,
    title: 'Persönliche Beratung',
    description: 'Individuelle Betreuung von der ersten Anfrage bis zum erfolgreichen Abschluss.',
  },
]

const stats = [
  { value: '10+', label: 'Jahre Erfahrung' },
  { value: '200+', label: 'Vermittelte Objekte' },
  { value: '100%', label: 'Persönliche Betreuung' },
  { value: '4', label: 'Regionen betreut' },
]

const testimonials = [
  {
    name: 'Familie Schneider',
    location: 'Hermeskeil',
    text: 'Herr Mezzarano hat uns kompetent beim Hauskauf beraten. Seine Ortskenntnis im Hochwald ist unschlagbar!',
    rating: 5,
  },
  {
    name: 'Thomas Weber',
    location: 'Trier',
    text: 'Schnelle Vermittlung meiner Eigentumswohnung zu einem hervorragenden Preis. Absolute Empfehlung!',
    rating: 5,
  },
  {
    name: 'Petra Hoffmann',
    location: 'Schweich',
    text: 'Kompetent, zuverlässig und immer erreichbar. So stelle ich mir Immobilienservice vor.',
    rating: 5,
  },
]

export default function HomePage() {
  const featuredProperties = getFeaturedProperties()

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxuriöses Haus"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        </div>

        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ihr Zuhause beginnt mit der richtigen Entscheidung
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Sandro Mezzarano – Ihr Wüstenrot Immobilienexperte für den Kauf, Verkauf
              und die Vermietung von Immobilien in Hermeskeil, Trier und der gesamten Mosel-Region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/immobilien" className="btn-gold text-lg">
                Immobilien entdecken
              </Link>
              <Link href="/kontakt" className="btn-secondary bg-white/10 border-white text-white hover:bg-white/20">
                Kostenlose Beratung
              </Link>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Art</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Kaufen oder Mieten</option>
                    <option value="kauf">Kaufen</option>
                    <option value="miete">Mieten</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Alle Typen</option>
                    <option value="wohnung">Wohnung</option>
                    <option value="haus">Haus</option>
                    <option value="villa">Villa</option>
                    <option value="gewerbe">Gewerbe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Standort</label>
                  <input
                    type="text"
                    placeholder="z.B. Hermeskeil, Trier"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="btn-primary w-full">
                    <Search className="h-5 w-5 mr-2" />
                    Suchen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-40 pb-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="section-subtitle mx-auto">
              Wir bieten Ihnen umfassende Dienstleistungen rund um Immobilien –
              persönlich, professionell und mit Leidenschaft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-700 transition-colors">
                  <service.icon className="h-7 w-7 text-primary-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title mb-2">Ausgewählte Immobilien</h2>
              <p className="text-gray-600">Entdecken Sie unsere Top-Angebote</p>
            </div>
            <Link href="/immobilien" className="btn-secondary">
              Alle Immobilien
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Ihr lokaler Wüstenrot Immobilienpartner
              </h2>
              <p className="text-gray-300 mb-6">
                Als Ihr Wüstenrot Immobilienexperte in Hermeskeil biete ich Ihnen persönliche
                Beratung mit umfassender Marktkenntnis. Mein Erfolg basiert auf Vertrauen,
                Kompetenz und individuellem Service für jeden Kunden.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Umfassende Marktkenntnis',
                  'Transparente Prozesse',
                  'Persönliche Betreuung',
                  'Netzwerk von Fachexperten',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-gold-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ueber-uns" className="btn-gold">
                Mehr über uns
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-gold-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Was unsere Kunden sagen</h2>
            <p className="section-subtitle mx-auto">
              Ihre Zufriedenheit ist unser größter Erfolg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-500">
        <div className="container-custom text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit, Ihre Traumimmobilie zu finden?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.
            Unser Team steht Ihnen gerne zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-gold-600 hover:bg-gray-100">
              Jetzt Kontakt aufnehmen
            </Link>
            <Link href="/immobilien" className="btn-secondary border-white text-white hover:bg-white/10">
              Immobilien durchsuchen
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="h-8 w-8" />
              <span className="font-medium">IVD Mitglied</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="h-8 w-8" />
              <span className="font-medium">TÜV Zertifiziert</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="h-8 w-8" />
              <span className="font-medium">Immobilienscout Partner</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="h-8 w-8" />
              <span className="font-medium">Bellevue Best Property</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
