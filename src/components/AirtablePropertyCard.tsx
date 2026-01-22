import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Square, Heart } from 'lucide-react'
import { AirtableProperty, getRsTypeLabel } from '@/lib/airtable'

interface AirtablePropertyCardProps {
  property: AirtableProperty
}

export default function AirtablePropertyCard({ property }: AirtablePropertyCardProps) {
  const formatPrice = (price: number | undefined, kategorie?: string) => {
    if (!price) return 'Preis auf Anfrage'
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return kategorie === 'Miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  const imageUrl = property.cover || property.bilder[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'
  const isRent = property.kategorie === 'Miete'

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={imageUrl}
          alt={property.titel}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            !isRent
              ? 'bg-secondary-900 text-white'
              : 'bg-white text-secondary-900'
          }`}>
            {isRent ? 'Mieten' : 'Kaufen'}
          </span>
          {property.rs_typ && (
            <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-primary-500 text-white">
              {getRsTypeLabel(property.rs_typ)}
            </span>
          )}
        </div>
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Zu Favoriten hinzufügen"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-2">
            <Link href={`/immobilien/airtable/${property.id}`}>
              {property.titel}
            </Link>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{property.ort || property.kurz_adresse || 'Standort auf Anfrage'}</span>
        </div>

        {property.beschreibung && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.beschreibung}
          </p>
        )}

        {/* Features */}
        <div className="flex items-center gap-4 py-4 border-t border-b border-gray-100 mb-4">
          {property.zimmer && property.zimmer > 0 && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.zimmer} Zimmer</span>
            </div>
          )}
          {property.wohnflaeche && property.wohnflaeche > 0 && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.wohnflaeche} m²</span>
            </div>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary-700">
              {formatPrice(property.preis, property.kategorie)}
            </p>
          </div>
          <Link
            href={`/immobilien/airtable/${property.id}`}
            className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  )
}
