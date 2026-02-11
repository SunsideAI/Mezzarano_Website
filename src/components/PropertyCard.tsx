import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { Property } from '@/data/properties'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, type: 'kauf' | 'miete') => {
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return type === 'miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
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
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
            <Link href={`/immobilie/${property.id}`}>
              {property.title}
            </Link>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{property.location}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 py-4 border-t border-b border-gray-100 mb-4">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{property.bedrooms} Zimmer</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{property.bathrooms} Bad</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Square className="h-4 w-4" />
            <span className="text-sm">{property.area} m²</span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary-700">
              {formatPrice(property.price, property.type)}
            </p>
          </div>
          <Link
            href={`/immobilie/${property.id}`}
            className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  )
}
