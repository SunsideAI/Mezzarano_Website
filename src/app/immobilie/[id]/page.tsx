import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle, Phone, Mail, ArrowLeft, Share2, Heart, Printer, Building, Thermometer, Trees, Home, Fence, Car, Layers } from 'lucide-react'
import { fetchPropertyByExposeId } from '@/lib/airtable'
import ImageGallery from '@/components/ImageGallery'
import PropertyMap from '@/components/PropertyMap'

// Contact info for Sandro Mezzarano
const agent = {
  name: 'Sandro Mezzarano',
  title: 'Wüstenrot Immobilienberater',
  phone1: '0177 6542977',
  phone2: '06503 9523963',
  email: 'sandro.mezzarano@wuestenrot.de',
  image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_200,h_200,c_fill,g_face,q_80/v1769254175/Mezzarano-bearb-1024x758_vgqhbw.jpg',
}

// Optimize Cloudinary URL with responsive size
function getOptimizedCloudinaryUrl(url: string, width: number = 1200): string {
  if (!url.includes('res.cloudinary.com')) {
    return url
  }
  if (url.includes('/upload/') && !url.includes('/f_auto') && !url.includes('/w_')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
  }
  return url
}

// Fallback: proxy URL for non-Cloudinary images
function getProxyImageUrl(recordId: string, index: number = 0): string {
  return `/api/image/${recordId}?index=${index}&type=bilder`
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyByExposeId(params.id)

  if (!property) {
    notFound()
  }

  const formatPrice = (price: number | undefined, kategorie?: string) => {
    if (!price) return 'Preis auf Anfrage'
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return kategorie === 'Miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  // Use direct Cloudinary URLs for speed, proxy only as fallback
  // Deduplicate by extracting unique images based on content hash in filename
  const seenImages = new Set<string>()
  const allImages: string[] = property.bilder
    .filter(url => {
      // Extract a unique identifier from the URL
      // For Cloudinary: use the public_id (path after version)
      // For others: use the full URL
      const match = url.match(/\/v\d+\/(.+)$/)
      const identifier = match ? match[1] : url
      if (seenImages.has(identifier)) {
        return false
      }
      seenImages.add(identifier)
      return true
    })
    .map(url => {
      // Use direct Cloudinary URL if available, otherwise use proxy
      if (url.includes('res.cloudinary.com')) {
        return getOptimizedCloudinaryUrl(url, 1200)
      }
      // For non-Cloudinary URLs, find the index and use proxy
      const index = property.bilder.indexOf(url)
      return getProxyImageUrl(property.id, index)
    })

  return (
    <div className="min-h-screen bg-warmgrau">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Link
            href="/immobilien"
            className="inline-flex items-center text-wuestennacht-light hover:text-wuestenrot-hover transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-warmgrau py-6">
        <div className="container-custom">
          <ImageGallery images={allImages} title={property.titel} />
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
                      ? 'bg-wuestenrot-25 text-wuestenrot-hover'
                      : 'bg-warmgrau text-wuestennacht-light'
                  }`}>
                    {property.kategorie === 'Miete' ? 'Zur Miete' : 'Zum Kauf'}
                  </span>
                  {(property.objekt_typ || property.unterkategorie) && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-warmgrau text-wuestennacht-light">
                      {property.objekt_typ || property.unterkategorie}
                    </span>
                  )}
                  {property.status && property.status !== 'Verfügbar' && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                      {property.status}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-ww-bold text-wuestennacht mb-4">
                  {property.titel}
                </h1>

                <div className="flex items-center gap-2 text-wuestennacht-light mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{property.adresse_komplett || property.kurz_adresse || `${property.plz} ${property.ort}`}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-3xl font-bold text-wuestenrot">
                      {property.preis ? `${new Intl.NumberFormat('de-DE').format(property.preis)} €` : 'Preis auf Anfrage'}
                    </p>
                    {property.kategorie === 'Miete' && property.preis && (
                      <p className="text-sm text-wuestennacht-hover">pro Monat</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-warmgrau rounded-fenster transition-colors" aria-label="Teilen">
                      <Share2 className="h-5 w-5 text-wuestennacht-hover" />
                    </button>
                    <button className="p-2 hover:bg-warmgrau rounded-fenster transition-colors" aria-label="Favorit">
                      <Heart className="h-5 w-5 text-wuestennacht-hover" />
                    </button>
                    <button className="p-2 hover:bg-warmgrau rounded-fenster transition-colors" aria-label="Drucken">
                      <Printer className="h-5 w-5 text-wuestennacht-hover" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-fenster shadow-sm">
                {property.zimmer !== undefined && property.zimmer > 0 && (
                  <div className="text-center p-4">
                    <Bed className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.zimmer}</p>
                    <p className="text-sm text-wuestennacht-hover">Zimmer</p>
                  </div>
                )}
                {property.schlafzimmer !== undefined && property.schlafzimmer > 0 && (
                  <div className="text-center p-4">
                    <Bed className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.schlafzimmer}</p>
                    <p className="text-sm text-wuestennacht-hover">Schlafzimmer</p>
                  </div>
                )}
                {property.badezimmer !== undefined && property.badezimmer > 0 && (
                  <div className="text-center p-4">
                    <Bath className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.badezimmer}</p>
                    <p className="text-sm text-wuestennacht-hover">{property.badezimmer === 1 ? 'Badezimmer' : 'Badezimmer'}</p>
                  </div>
                )}
                {property.wohnflaeche !== undefined && property.wohnflaeche > 0 && (
                  <div className="text-center p-4">
                    <Square className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.wohnflaeche}</p>
                    <p className="text-sm text-wuestennacht-hover">m² Wohnfläche</p>
                  </div>
                )}
                {property.grundstueck !== undefined && property.grundstueck > 0 && (
                  <div className="text-center p-4">
                    <Fence className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.grundstueck}</p>
                    <p className="text-sm text-wuestennacht-hover">m² Grundstück</p>
                  </div>
                )}
                {property.etagen !== undefined && property.etagen > 0 && (
                  <div className="text-center p-4">
                    <Layers className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.etagen}</p>
                    <p className="text-sm text-wuestennacht-hover">{property.etagen === 1 ? 'Etage' : 'Etagen'}</p>
                  </div>
                )}
                {property.baujahr !== undefined && property.baujahr > 0 && (
                  <div className="text-center p-4">
                    <Calendar className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.baujahr}</p>
                    <p className="text-sm text-wuestennacht-hover">Baujahr</p>
                  </div>
                )}
                {property.balkone !== undefined && property.balkone > 0 && (
                  <div className="text-center p-4">
                    <Home className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.balkone}</p>
                    <p className="text-sm text-wuestennacht-hover">{property.balkone === 1 ? 'Balkon' : 'Balkone'}</p>
                  </div>
                )}
                {property.terrassen !== undefined && property.terrassen > 0 && (
                  <div className="text-center p-4">
                    <Trees className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{property.terrassen}</p>
                    <p className="text-sm text-wuestennacht-hover">{property.terrassen === 1 ? 'Terrasse' : 'Terrassen'}</p>
                  </div>
                )}
                {((property.garagen !== undefined && property.garagen > 0) || (property.stellplaetze !== undefined && property.stellplaetze > 0)) && (
                  <div className="text-center p-4">
                    <Car className="h-8 w-8 text-wuestenrot mx-auto mb-2" />
                    <p className="text-2xl font-bold text-wuestennacht">{(property.garagen || 0) + (property.stellplaetze || 0)}</p>
                    <p className="text-sm text-wuestennacht-hover">Stellplätze</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {(property.objektbeschreibung || property.beschreibung) && (
                <div className="bg-white p-8 rounded-fenster shadow-sm">
                  <h2 className="text-2xl font-ww-bold text-wuestennacht mb-4">
                    Beschreibung
                  </h2>
                  <div className="text-wuestennacht-light leading-relaxed whitespace-pre-wrap">
                    {property.objektbeschreibung || property.beschreibung}
                  </div>
                </div>
              )}

              {/* Location Description */}
              {property.lage && (
                <div className="bg-white p-8 rounded-fenster shadow-sm">
                  <h2 className="text-2xl font-ww-bold text-wuestennacht mb-4">
                    Lage
                  </h2>
                  <div className="text-wuestennacht-light leading-relaxed whitespace-pre-wrap">
                    {property.lage}
                  </div>
                </div>
              )}

              {/* Features / Ausstattung */}
              {property.ausstattung && (
                <div className="bg-white p-8 rounded-fenster shadow-sm">
                  <h2 className="text-2xl font-ww-bold text-wuestennacht mb-6">
                    Ausstattung
                  </h2>
                  <div className="text-wuestennacht-light leading-relaxed whitespace-pre-wrap">
                    {property.ausstattung}
                  </div>
                </div>
              )}

              {/* Energy Info */}
              {(property.energieausweis || property.energieeffizienzklasse || property.heizung) && (
                <div className="bg-white p-8 rounded-fenster shadow-sm">
                  <h2 className="text-2xl font-ww-bold text-wuestennacht mb-6">
                    Energiedaten
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.energieeffizienzklasse && (
                      <div className="flex items-center gap-3">
                        <Thermometer className="h-5 w-5 text-wuestenrot flex-shrink-0" />
                        <div>
                          <p className="text-sm text-wuestennacht-hover">Energieeffizienzklasse</p>
                          <p className="font-medium text-wuestennacht">{property.energieeffizienzklasse}</p>
                        </div>
                      </div>
                    )}
                    {property.heizung && (
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-wuestennacht-hover">Heizung</p>
                          <p className="font-medium text-wuestennacht">{property.heizung}</p>
                        </div>
                      </div>
                    )}
                    {property.energieausweis && (
                      <div className="flex items-center gap-3 col-span-full">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-wuestennacht-hover">Energieausweis</p>
                          <p className="font-medium text-wuestennacht">{property.energieausweis}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Map */}
              <PropertyMap
                address={property.adresse_komplett || property.kurz_adresse || ''}
                city={property.ort || ''}
                plz={property.plz}
                region={property.region}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Contact Form */}
                <div className="bg-white p-6 rounded-fenster shadow-lg">
                  <h3 className="text-xl font-ww-bold text-wuestennacht mb-6">
                    Interesse an dieser Immobilie?
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-wuestennacht-light mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        aria-required="true"
                        className="w-full px-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-wuestennacht-light mb-1">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        aria-required="true"
                        className="w-full px-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-wuestennacht-light mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        className="w-full px-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-wuestennacht-light mb-1">
                        Nachricht
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        defaultValue={`Ich interessiere mich für "${property.titel}" und bitte um weitere Informationen.`}
                        className="w-full px-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Anfrage senden
                    </button>
                  </form>
                </div>

                {/* Agent Info */}
                <div className="bg-white p-6 rounded-fenster shadow-lg">
                  <h3 className="text-lg font-ww-bold text-wuestennacht mb-4">
                    Ihr Ansprechpartner
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-wuestennacht">{agent.name}</p>
                      <p className="text-sm text-wuestennacht-hover">{agent.title}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a
                      href={`tel:${agent.phone1.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-wuestennacht-light hover:text-wuestenrot-hover transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone1}</span>
                    </a>
                    <a
                      href={`tel:${agent.phone2.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 text-wuestennacht-light hover:text-wuestenrot-hover transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{agent.phone2}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-wuestennacht-light hover:text-wuestenrot-hover transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>{agent.email}</span>
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
