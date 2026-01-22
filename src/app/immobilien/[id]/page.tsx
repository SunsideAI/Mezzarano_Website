import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone, Mail, ArrowLeft, Share2, Heart, Printer } from 'lucide-react'
import { getPropertyById, properties } from '@/data/properties'

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }))
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number, type: 'kauf' | 'miete') => {
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return type === 'miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/immobilien"
            className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-gray-900">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
            <div className="md:col-span-2 relative rounded-xl overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4">
              {property.images.slice(1, 3).map((image, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={`${property.title} - Bild ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Price */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.type === 'kauf'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gold-100 text-gold-700'
                  }`}>
                    {property.type === 'kauf' ? 'Zum Kauf' : 'Zur Miete'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 capitalize">
                    {property.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{property.address}</span>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-primary-500">
                    {formatPrice(property.price, property.type)}
                  </p>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Teilen">
                      <Share2 className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Favorit">
                      <Heart className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Drucken">
                      <Printer className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="text-center p-4">
                  <Bed className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                  <p className="text-sm text-gray-500">Zimmer</p>
                </div>
                <div className="text-center p-4">
                  <Bath className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                  <p className="text-sm text-gray-500">Badezimmer</p>
                </div>
                <div className="text-center p-4">
                  <Square className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.area}</p>
                  <p className="text-sm text-gray-500">m² Fläche</p>
                </div>
                <div className="text-center p-4">
                  <Calendar className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{property.yearBuilt}</p>
                  <p className="text-sm text-gray-500">Baujahr</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Beschreibung
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Diese einzigartige Immobilie bietet Ihnen erstklassigen Wohnkomfort in einer der
                  begehrtesten Lagen. Die hochwertige Ausstattung und die durchdachte Raumaufteilung
                  machen dieses Objekt zu einem wahren Juwel auf dem Immobilienmarkt.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Die Lage überzeugt durch ihre hervorragende Infrastruktur mit Geschäften des
                  täglichen Bedarfs, Schulen und öffentlichen Verkehrsmitteln in unmittelbarer Nähe.
                </p>
              </div>

              {/* Features */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ausstattung
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Lage
                </h2>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{property.address}</p>
                    <p className="text-gray-500">{property.location}</p>
                  </div>
                </div>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Karte wird geladen...</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Form */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Interesse an dieser Immobilie?
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nachricht
                      </label>
                      <textarea
                        rows={4}
                        defaultValue={`Ich interessiere mich für "${property.title}" und bitte um weitere Informationen.`}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Anfrage senden
                    </button>
                  </form>
                </div>

                {/* Agent Info */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Ihr Ansprechpartner
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-500">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sandro Mezzarano</p>
                      <p className="text-sm text-gray-500">Wüstenrot Immobilienberater</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="tel:01776542977"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>0177 6542977</span>
                    </a>
                    <a
                      href="tel:065039523963"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>06503 9523963</span>
                    </a>
                    <a
                      href="mailto:sandro.mezzarano@wuestenrot.de"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>sandro.mezzarano@wuestenrot.de</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
