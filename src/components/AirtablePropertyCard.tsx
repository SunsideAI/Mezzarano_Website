'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Bed, Square, Heart, ImageOff } from 'lucide-react'
import { AirtableProperty } from '@/lib/airtable'

interface AirtablePropertyCardProps {
  property: AirtableProperty
  priority?: boolean
}

// Optimize Cloudinary URL with responsive width and auto format/quality
function getOptimizedCloudinaryUrl(url: string, width: number = 400): string {
  if (!url.includes('res.cloudinary.com')) {
    return url
  }
  if (url.includes('/upload/') && !url.includes('/f_auto') && !url.includes('/w_')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_limit/`)
  }
  return url
}

export default function AirtablePropertyCard({ property }: AirtablePropertyCardProps) {
  const [imageError, setImageError] = useState(false)

  // Get the first image URL directly from property data
  const directImageUrl = property.cover || (property.bilder && property.bilder[0]) || null

  // Optimize for mobile (400px) - Cloudinary will serve WebP automatically
  const imageUrl = directImageUrl?.includes('res.cloudinary.com')
    ? getOptimizedCloudinaryUrl(directImageUrl, 600)
    : directImageUrl

  // Reset error state when property changes
  useEffect(() => {
    setImageError(false)
  }, [property.id])

  const isRent = property.kategorie === 'Miete'
  const propertyType = property.objekt_typ || property.unterkategorie

  return (
    <article className="bg-white rounded-fenster shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image - using CSS background for instant loading */}
      <div className="relative h-48 overflow-hidden bg-warmgrau">
        {/* Image as background - loads immediately without React state issues */}
        {imageUrl && !imageError ? (
          <div
            className="absolute inset-0 bg-cover bg-center z-10 group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={property.titel}
          >
            {/* Hidden img to detect load errors */}
            <img
              src={imageUrl}
              alt=""
              className="hidden"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="absolute inset-0 z-10 bg-warmgrau flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Property Type Badge - Fenster-Form */}
        {propertyType && (
          <div className="absolute top-4 left-4 z-30">
            <span className="px-3 py-1 rounded-fenster text-sm font-bold bg-wuestenrot text-white">
              {propertyType}
            </span>
          </div>
        )}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-muenze flex items-center justify-center hover:bg-white transition-colors z-30"
          aria-label="Zu Favoriten hinzufügen"
        >
          <Heart className="h-5 w-5 text-wuestennacht-light hover:text-wuestenrot transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-wuestennacht group-hover:text-wuestenrot transition-colors line-clamp-2">
            <Link href={`/immobilie/${property.expose_id}`}>
              {property.titel}
            </Link>
          </h3>
        </div>

        <div className="flex items-center gap-2 text-wuestennacht-light mb-4">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{property.ort || property.kurz_adresse || 'Standort auf Anfrage'}</span>
        </div>

        {property.beschreibung && property.beschreibung.trim() !== '' && property.beschreibung.trim() !== '00' && (
          <p className="text-wuestennacht-light text-sm mb-4 line-clamp-2">
            {property.beschreibung}
          </p>
        )}

        {/* Features */}
        <div className="flex items-center gap-4 py-4 border-t border-b border-warmgrau mb-4">
          {property.zimmer && property.zimmer > 0 && (
            <div className="flex items-center gap-1.5 text-wuestennacht-light">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.zimmer} Zimmer</span>
            </div>
          )}
          {property.wohnflaeche && property.wohnflaeche > 0 && (
            <div className="flex items-center gap-1.5 text-wuestennacht-light">
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
                <p className="text-2xl font-bold text-wuestenrot">
                  {property.preis ? `${new Intl.NumberFormat('de-DE').format(property.preis)} €` : 'Auf Anfrage'}
                </p>
                <p className="text-sm text-wuestennacht-light">pro Monat</p>
              </>
            ) : (
              <p className="text-2xl font-bold text-wuestenrot">
                {property.preis ? `${new Intl.NumberFormat('de-DE').format(property.preis)} €` : 'Preis auf Anfrage'}
              </p>
            )}
          </div>
          <Link
            href={`/immobilie/${property.expose_id}`}
            className="text-wuestenrot font-bold hover:text-wuestenrot-hover transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  )
}
