import Link from 'next/link'
import Image from 'next/image'
import { Home, Key, TrendingUp, Users, Award, CheckCircle, ArrowRight, Star } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import AirtablePropertyCard from '@/components/AirtablePropertyCard'
import { getFeaturedProperties } from '@/data/properties'
import HeroSlider from '@/components/HeroSlider'
import RegionsGrid from '@/components/RegionsGrid'
import InstagramFeed from '@/components/InstagramFeed'
import { fetchEstates, isOnOfficeConfigured, OnOfficeProperty } from '@/lib/onoffice'
import { fetchProperties as fetchAirtableProperties, AirtableProperty } from '@/lib/airtable'
import ProvenExpertWidget from '@/components/ProvenExpertWidget'

// Force dynamic rendering to fetch fresh Airtable data
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  { value: '16+', label: 'Jahre Erfahrung' },
  { value: '200+', label: 'Vermittelte Objekte' },
  { value: '100%', label: 'Persönliche Betreuung' },
  { value: '6+', label: 'Regionen betreut' },
]

const testimonials = [
  {
    name: 'Enrico Mildenberger',
    location: 'Google Bewertung',
    text: 'Sehr freundlicher Mann. War eine super Erfahrung mit Herrn Mezzarano, der uns eine wunderschöne Wohnung vermittelt hat. Stets hilfsbereit und offen für alle Fragen. Jederzeit ansprechbar und erreichbar.',
    rating: 5,
  },
  {
    name: 'Bernhard Stein',
    location: 'Google Local Guide',
    text: 'Die Bewertung ist top, weil wir und unser Verkauf Objekt von Anfang an persönlich und mit viel Engagement betreut wurde. Es wurde kein Einsatz und keine Kommunikationskanäle gescheut die Vermarktung voran zu bringen. Uneingeschränkt zu empfehlen.',
    rating: 5,
  },
  {
    name: 'Erik Jenchenne',
    location: 'Google Local Guide',
    text: 'Welch ein Glück hatten mein Geschäftspartner und ich, auf Sandro zu stoßen. Er war während des gesamten Verkaufsprozesses von unschätzbarer Hilfe. Die Kommunikation war stets konstant und einfach. Ich kann Sandro nur wärmstens empfehlen.',
    rating: 5,
  },
]

// Helper to convert OnOfficeProperty to AirtableProperty format for the card component
function normalizeOnOfficeProperty(prop: OnOfficeProperty): AirtableProperty {
  const isRent = prop.vermarktungsart === 'miete'
  return {
    id: String(prop.id),
    expose_id: prop.expose_id,
    titel: prop.titel,
    beschreibung: prop.objektbeschreibung,
    kurz_adresse: [prop.strasse, prop.hausnummer].filter(Boolean).join(' ') || undefined,
    adresse_komplett: [prop.strasse, prop.hausnummer, prop.plz, prop.ort].filter(Boolean).join(', ') || undefined,
    strasse: prop.strasse,
    haus_nummer: prop.hausnummer,
    plz: prop.plz,
    ort: prop.ort,
    region: prop.region,
    kategorie: isRent ? 'Miete' : 'Kauf',
    unterkategorie: prop.objekttyp,
    objekt_typ: prop.nutzungsart,
    rs_typ: prop.objektart?.toUpperCase(),
    marketing_typ: isRent ? 'RENT' : 'BUY',
    status: prop.status === 1 ? 'Verfügbar' : 'Archiviert',
    preis: isRent ? prop.kaltmiete : prop.kaufpreis,
    wohnflaeche: prop.wohnflaeche,
    grundstueck: prop.grundstuecksflaeche,
    zimmer: prop.anzahl_zimmer,
    schlafzimmer: prop.anzahl_schlafzimmer,
    badezimmer: prop.anzahl_badezimmer,
    balkone: prop.anzahl_balkone,
    terrassen: prop.anzahl_terrassen,
    etagen: prop.anzahl_etagen,
    garagen: prop.anzahl_garagen,
    stellplaetze: prop.anzahl_stellplaetze,
    baujahr: prop.baujahr,
    heizung: prop.heizungsart,
    objektbeschreibung: prop.objektbeschreibung,
    lage: prop.lage,
    ausstattung: prop.ausstattung_beschr,
    energieausweis: prop.energieausweistyp,
    energieeffizienzklasse: prop.energieeffizienzklasse,
    bilder: prop.bilder,
    cover: prop.titelbild,
  }
}

export default async function HomePage() {
  // Fetch from Airtable first, fall back to onOffice, then static data
  let properties: AirtableProperty[] = []
  let dataSource = 'static'

  // Try Airtable first
  try {
    properties = await fetchAirtableProperties({ show_all: true })
    if (properties.length > 0) {
      dataSource = 'airtable'
    }
  } catch (error) {
    console.error('Failed to fetch Airtable properties:', error)
  }

  // Fallback to onOffice
  if (properties.length === 0 && isOnOfficeConfigured()) {
    try {
      const { properties: onOfficeProps } = await fetchEstates()
      if (onOfficeProps.length > 0) {
        properties = onOfficeProps.map(normalizeOnOfficeProperty)
        dataSource = 'onoffice'
      }
    } catch (error) {
      console.error('Failed to fetch onOffice properties:', error)
    }
  }

  const staticFeaturedProperties = getFeaturedProperties()
  const hasLiveData = properties.length > 0

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16" data-aos="fade-up">
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
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-primary-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
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
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12" data-aos="fade-up">
            <div>
              <h2 className="section-title mb-2">Aktuelle Immobilien</h2>
              <p className="text-secondary-600">
                {hasLiveData ? 'Live aus unserem Angebot' : 'Entdecken Sie unsere Top-Angebote'}
              </p>
            </div>
            <Link href="/immobilien" className="btn-secondary group ripple">
              Alle Immobilien
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {hasLiveData ? (
              properties.slice(0, 4).map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <AirtablePropertyCard property={property} priority={index < 2} />
                </div>
              ))
            ) : (
              staticFeaturedProperties.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <PropertyCard property={property} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-secondary-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ihr lokaler <span className="text-primary-500">Wüstenrot</span> Immobilienpartner
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Als Ihr Wüstenrot Immobilienexperte in Hermeskeil biete ich Ihnen persönliche
                Beratung mit umfassender Marktkenntnis. Ihr Erfolg ist mein Ziel – durch Vertrauen,
                Kompetenz und individuellen Service.
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

            <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
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
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Unsere Regionen</h2>
            <p className="section-subtitle mx-auto">
              Aktiv in Hermeskeil, Trier, an der Mosel und im gesamten Hochwald
            </p>
          </div>

          <RegionsGrid />
        </div>
      </section>

      {/* Trust Section - Makler Portrait & Auszeichnungen */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Ihr Ansprechpartner</h2>
            <p className="section-subtitle mx-auto">
              Kompetenz und Vertrauen aus einer Hand
            </p>
          </div>

          {/* Portrait Card */}
          <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-2/5 relative">
                  <div className="aspect-[3/4] md:aspect-auto md:h-full relative">
                    <Image
                      src="https://res.cloudinary.com/djqviyb2c/image/upload/w_600,q_80/v1770806323/Lebenskunst-Photography_-078_-_Sandro_-_11.09.2025_-_Business_fotografie-_Trier-13__2_r18b6c.jpg"
                      alt="Sandro Mezzarano - Ihr Immobilienmakler"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                    Sandro Mezzarano
                  </h3>
                  <p className="text-primary-600 font-semibold mb-4">
                    Wüstenrot Immobilienberater
                  </p>
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    Mit über 16 Jahren Erfahrung in der Immobilienbranche bin ich Ihr verlässlicher Partner
                    für alle Fragen rund um Kauf, Verkauf und Bewertung von Immobilien in der Region
                    Trier-Saarburg und im Hochwald.
                  </p>
                  <p className="text-secondary-600 leading-relaxed">
                    Persönliche Beratung, transparente Prozesse und die Stärke eines großen Netzwerks –
                    dafür stehe ich mit meinem Namen.
                  </p>
                  <div className="mt-6">
                    <Link href="/ueber-uns" className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center gap-2 group">
                      Mehr erfahren
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards - Simple Logo Bar */}
          <div className="mt-12 pt-12 border-t border-gray-200" data-aos="fade-up" data-aos-delay="200">
            <p className="text-center text-secondary-400 text-sm mb-6">
              Ausgezeichnet für höchste Beratungsqualität
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/Focus_Money_H%C3%B6chste_Kompetenz_WUESTENROT_IMMOBILIEN_2025_gnwd3c.jpg"
                alt="Focus Money - Höchste Kompetenz 2025"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/Handelsblatt_Exzellente_Kundenberatung_WUESTENROT_IMMOBILIEN_2025_z9rek4.jpg"
                alt="Handelsblatt - Exzellente Kundenberatung 2025"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
              <Image
                src="https://res.cloudinary.com/djqviyb2c/image/upload/w_300,q_80/v1770805619/LOGO_Sanierungsexperte_Sprengnetter_ks7vfd.png"
                alt="Sprengnetter Qualifizierter Fachmakler - Sanierungsexperte"
                width={100}
                height={130}
                className="object-contain opacity-90"
              />
            </div>

            {/* ProvenExpert Widget */}
            <ProvenExpertWidget />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="section-title mb-4">Was Kunden sagen</h2>
            <p className="section-subtitle mx-auto">
              Ihre Zufriedenheit ist mein größter Erfolg
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Quote Icon */}
                <div className="absolute -top-3 left-6">
                  <div className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-serif">
                    &ldquo;
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-secondary-700 mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                      <div className="text-sm text-secondary-500">{testimonial.location}</div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary-500 text-primary-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center mt-10" data-aos="fade-up">
            <a
              href="https://www.google.com/search?q=Mezzarano+Sandro+Rezensionen&rldimm=5940643087853021481&tbm=lcl&hl=de-DE#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <span>Mehr Bewertungen auf Google</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-6" data-aos="fade-up">
            <p className="text-xs text-secondary-400 max-w-2xl mx-auto">
              Die hier dargestellten Bewertungen stammen von Google und wurden von uns nicht auf ihre Echtheit überprüft.
              Sie geben die persönliche Meinung der jeweiligen Verfasser wieder.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed username="mezzarano.wuestenrotimmobilien" />

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-primary-500">
        <div className="container-custom text-center" data-aos="fade-up">
          <p className="text-white/80 text-lg italic mb-4">&bdquo;Ehrlichkeit hat ein Zuhause.&ldquo;</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit, Ihre Traumimmobilie zu finden?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie mich noch heute für eine unverbindliche Beratung.
            Ich stehe Ihnen persönlich zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 group">
              Jetzt Kontakt aufnehmen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="tel:01776542977" className="btn-outline-dark">
              <span className="mr-2">📞</span>
              0177 6542977
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
