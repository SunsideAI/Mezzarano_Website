import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import { getFeaturedProperties } from '@/data/properties'
import HeroSlider from '@/components/HeroSlider'

const services = [
  {
    icon: Home,
    title: 'Immobilien kaufen',
    description: 'Finden Sie Ihr Traumhaus aus unserem exklusiven Portfolio an Häusern, Wohnungen und Villen.',
  },
  {
    icon: Key,
    title: 'Immobilien verkaufen',
    description: 'Professionelle Vermarktung Ihrer Immobilie zum bestmöglichen Preis.',
  },
  {
    icon: TrendingUp,
    title: 'Immobilienbewertung',
    description: 'Kostenlose und marktgerechte Wertermittlung für Ihre Immobilie.',
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

const regions = [
  { name: 'Hermeskeil', href: '/regionen/hermeskeil' },
  { name: 'Trier', href: '/regionen/trier' },
  { name: 'Bernkastel-Kues', href: '/regionen/bernkastel-kues' },
  { name: 'Schweich', href: '/regionen/schweich' },
]

export default function HomePage() {
  const featuredProperties = getFeaturedProperties()

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="section-subtitle mx-auto">
              Umfassende Dienstleistungen rund um Immobilien –
              persönlich, professionell und mit Leidenschaft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="section-title mb-2">Ausgewählte Immobilien</h2>
              <p className="text-secondary-600">Entdecken Sie unsere Top-Angebote</p>
            </div>
            <Link href="/immobilien" className="btn-secondary group">
              Alle Immobilien
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
      <section className="py-20 bg-secondary-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ihr lokaler <span className="text-primary-500">Wüstenrot</span> Immobilienpartner
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Als Ihr Wüstenrot Immobilienexperte in Hermeskeil biete ich Ihnen persönliche
                Beratung mit umfassender Marktkenntnis. Mein Erfolg basiert auf Vertrauen,
                Kompetenz und individuellem Service für jeden Kunden.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Umfassende Marktkenntnis in der Region',
                  'Transparente Prozesse von Anfang bis Ende',
                  'Persönliche Betreuung – kein Call-Center',
                  'Wüstenrot Finanzierungsnetzwerk',
                ].map((item, index) => (
                  <li key={item} className="flex items-center gap-3" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ueber-uns" className="btn-primary btn-shine group">
                Mehr über mich
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl font-bold text-primary-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Unsere Regionen</h2>
            <p className="section-subtitle mx-auto">
              Aktiv in Hermeskeil, Trier, an der Mosel und im gesamten Hochwald
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <Link
                key={region.name}
                href={region.href}
                className="relative group overflow-hidden rounded-xl aspect-[4/3]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={`https://images.unsplash.com/photo-156400${index + 1}3799919-ab600027ffc6?w=600&q=80`}
                  alt={region.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{region.name}</h3>
                  <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-primary-400 transition-colors">
                    Immobilien entdecken
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Was Kunden sagen</h2>
            <p className="section-subtitle mx-auto">
              Ihre Zufriedenheit ist mein größter Erfolg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <p className="text-secondary-600 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                  <div className="text-sm text-secondary-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit, Ihre Traumimmobilie zu finden?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung.
            Ich stehe Ihnen persönlich zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 btn-shine">
              Jetzt Kontakt aufnehmen
            </Link>
            <Link href="/immobilien" className="btn-outline">
              Immobilien durchsuchen
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center gap-3 text-secondary-400 hover:text-primary-500 transition-colors">
              <Award className="h-8 w-8" />
              <span className="font-medium">Wüstenrot Partner</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-400 hover:text-primary-500 transition-colors">
              <Award className="h-8 w-8" />
              <span className="font-medium">Lokale Expertise</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-400 hover:text-primary-500 transition-colors">
              <Award className="h-8 w-8" />
              <span className="font-medium">Finanzierung aus einer Hand</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-400 hover:text-primary-500 transition-colors">
              <Award className="h-8 w-8" />
              <span className="font-medium">Persönlicher Service</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
