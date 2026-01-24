'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Bed, Square, Heart } from 'lucide-react'
import { AirtableProperty } from '@/lib/airtable'

interface AirtablePropertyCardProps {
  property: AirtableProperty
}

// Helper to get proxy URL for Airtable images (prevents URL expiration issues)
function getProxyImageUrl(recordId: string, index: number = 0, type: 'bilder' | 'cover' = 'bilder'): string {
  return `/api/image/${recordId}?index=${index}&type=${type}`
}

export default function AirtablePropertyCard({ property }: AirtablePropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Reset image state when property changes to prevent showing old image
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [property.id])

  const formatPrice = (price: number | undefined, kategorie?: string) => {
    if (!price) return 'Preis auf Anfrage'
    const formatted = new Intl.NumberFormat('de-DE').format(price)
    return kategorie === 'Miete' ? `${formatted} €/Monat` : `${formatted} €`
  }

  // Use proxy URL for Airtable images to avoid expiration
  const hasAirtableImages = property.cover || (property.bilder && property.bilder.length > 0)
  const imageUrl = hasAirtableImages && !imageError
    ? getProxyImageUrl(property.id, 0, property.cover ? 'cover' : 'bilder')
    : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'

  const isRent = property.kategorie === 'Miete'
  // Property type from objekt_typ or unterkategorie
  const propertyType = property.objekt_typ || property.unterkategorie

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
            </div>
          </div>
        )}
        <Image
          src={imageUrl}
          alt={property.titel}
          fill
          unoptimized={imageUrl.startsWith('/api/')}
          className={`object-cover group-hover:scale-105 transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true)
            setImageLoaded(true)
          }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
            !isRent
              ? 'bg-secondary-900 text-white'
              : 'bg-white text-secondary-900'
          }`}>
            {isRent ? 'Mieten' : 'Kaufen'}
          </span>
          {propertyType && (
            <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-primary-500 text-white">
              {propertyType}
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
            {isRent ? (
              <>
                <p className="text-2xl font-bold text-primary-700">
                  {property.preis ? `${new Intl.NumberFormat('de-DE').format(property.preis)} €` : 'Auf Anfrage'}
                </p>
                <p className="text-sm text-gray-500">pro Monat</p>
              </>
            ) : (
              <p className="text-2xl font-bold text-primary-700">
                {property.preis ? `${new Intl.NumberFormat('de-DE').format(property.preis)} €` : 'Preis auf Anfrage'}
              </p>
            )}
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
