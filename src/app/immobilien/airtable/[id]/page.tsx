import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Square, Calendar, CheckCircle, Phone, Mail, ArrowLeft, Share2, Heart, Printer, Building, Thermometer } from 'lucide-react'
import { fetchPropertyById } from '@/lib/airtable'

// Contact info for Sandro Mezzarano
const agent = {
  name: 'Sandro Mezzarano',
  title: 'Wüstenrot Immobilienberater',
  phone1: '0177 6542977',
  phone2: '06503 9523963',
  email: 'sandro.mezzarano@wuestenrot.de',
}

export default async function AirtablePropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyById(params.id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number | undefined, kategorie?: string) => {
    if (!price) return 'Preis auf Anfrage'
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return kategorie === 'Miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  const mainImage = property.cover || property.bilder[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'
  const additionalImages = property.bilder.slice(1, 3)

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
      <section className="bg-secondary-900">
        <div className="container-custom py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
            <div className="md:col-span-2 relative rounded-xl overflow-hidden">
              <Image
                src={mainImage}
                alt={property.titel}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4">
              {additionalImages.length > 0 ? (
                additionalImages.map((image, index) => (
                  <div key={index} className="relative rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`${property.titel} - Bild ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="relative rounded-xl overflow-hidden bg-secondary-800 flex items-center justify-center">
                    <Building className="h-16 w-16 text-secondary-600" />
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-secondary-800 flex items-center justify-center">
                    <Building className="h-16 w-16 text-secondary-600" />
                  </div>
                </>
              )}
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
                    property.kategorie !== 'Miete'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-secondary-100 text-secondary-700'
                  }`}>
                    {property.kategorie === 'Miete' ? 'Zur Miete' : 'Zum Kauf'}
                  </span>
                  {(property.objekt_typ || property.unterkategorie) && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                      {property.objekt_typ || property.unterkategorie}
                    </span>
                  )}
                  {property.status && property.status !== 'Verfügbar' && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                      {property.status}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {property.titel}
                </h1>

                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{property.adresse_komplett || property.kurz_adresse || `${property.plz} ${property.ort}`}</span>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-3xl font-bold text-primary-500">
                    {formatPrice(property.preis, property.kategorie)}
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
                {property.zimmer !== undefined && property.zimmer > 0 && (
                  <div className="text-center p-4">
                    <Bed className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.zimmer}</p>
                    <p className="text-sm text-gray-500">Zimmer</p>
                  </div>
                )}
                {property.wohnflaeche !== undefined && property.wohnflaeche > 0 && (
                  <div className="text-center p-4">
                    <Square className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.wohnflaeche}</p>
                    <p className="text-sm text-gray-500">m² Wohnfläche</p>
                  </div>
                )}
                {property.grundstueck !== undefined && property.grundstueck > 0 && (
                  <div className="text-center p-4">
                    <Building className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.grundstueck}</p>
                    <p className="text-sm text-gray-500">m² Grundstück</p>
                  </div>
                )}
                {property.baujahr !== undefined && property.baujahr > 0 && (
                  <div className="text-center p-4">
                    <Calendar className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{property.baujahr}</p>
                    <p className="text-sm text-gray-500">Baujahr</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {(property.objektbeschreibung || property.beschreibung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Beschreibung
                  </h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {property.objektbeschreibung || property.beschreibung}
                  </div>
                </div>
              )}

              {/* Location Description */}
              {property.lage && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Lage
                  </h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {property.lage}
                  </div>
                </div>
              )}

              {/* Features / Ausstattung */}
              {property.ausstattung && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Ausstattung
                  </h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {property.ausstattung}
                  </div>
                </div>
              )}

              {/* Energy Info */}
              {(property.energieausweis || property.energieeffizienzklasse || property.heizung) && (
                <div className="bg-white p-8 rounded-xl shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Energiedaten
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.energieeffizienzklasse && (
                      <div className="flex items-center gap-3">
                        <Thermometer className="h-5 w-5 text-primary-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Energieeffizienzklasse</p>
                          <p className="font-medium text-gray-900">{property.energieeffizienzklasse}</p>
                        </div>
                      </div>
                    )}
                    {property.heizung && (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Heizung</p>
                          <p className="font-medium text-gray-900">{property.heizung}</p>
                        </div>
                      </div>
                    )}
                    {property.energieausweis && (
                      <div className="flex items-center gap-3 col-span-full">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-gray-500">Energieausweis</p>
                          <p className="font-medium text-gray-900">{property.energieausweis}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Adresse
                </h2>
                <div className="flex items-start gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {property.adresse_komplett || property.kurz_adresse || 'Adresse auf Anfrage'}
                    </p>
                    {property.ort && <p className="text-gray-500">{property.plz} {property.ort}</p>}
                    {property.region && <p className="text-gray-500">Region: {property.region}</p>}
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
                        defaultValue={`Ich interessiere mich für "${property.titel}" und bitte um weitere Informationen.`}
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
                      <p className="font-semibold text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${agent.phone1.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone1}</span>
                    </a>
                    <a
                      href={`tel:${agent.phone2.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone2}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{agent.email}</span>
                    </a>
                  </div>
                </div>

                {/* Wüstenrot Link */}
                {property.url && (
                  <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
                    <p className="text-sm text-gray-600 mb-3">
                      Diese Immobilie auf Wüstenrot ansehen:
                    </p>
                    <a
                      href={property.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 font-medium text-sm"
                    >
                      Zum Wüstenrot-Exposé →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
