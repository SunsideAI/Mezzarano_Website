'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MapPin, Bed, Square, Heart, ImageOff } from 'lucide-react'
import { AirtableProperty } from '@/lib/airtable'

interface AirtablePropertyCardProps {
  property: AirtableProperty
  priority?: boolean // Load image with priority (for above-the-fold images)
}

// Helper to get proxy URL for Airtable images (prevents URL expiration issues)
// Width parameter allows responsive image loading: smaller on mobile, larger on desktop
function getProxyImageUrl(recordId: string, index: number = 0, type: 'bilder' | 'cover' = 'bilder', width: number = 800): string {
  return `/api/image/${recordId}?index=${index}&type=${type}&w=${width}`
}

export default function AirtablePropertyCard({ property, priority = false }: AirtablePropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Check if property has real images (no fallbacks!)
  const hasRealImages = property.cover || (property.bilder && property.bilder.length > 0)

  // Only create image URLs if we have real images - with responsive sizes for mobile optimization
  const imageType = property.cover ? 'cover' : 'bilder'
  const imageUrl = hasRealImages
    ? getProxyImageUrl(property.id, 0, imageType, 400) // Default to mobile size
    : null
  // Larger image for desktop
  const imageUrlLarge = hasRealImages
    ? getProxyImageUrl(property.id, 0, imageType, 800)
    : null

  // Reset image state when property changes
  useEffect(() => {
    setImageLoaded(false)
    setImageError(false)
  }, [property.id])

  const isRent = property.kategorie === 'Miete'
  const propertyType = property.objekt_typ || property.unterkategorie

  // Show image only when we have a real URL and it's loaded
  const showImage = imageUrl && imageLoaded && !imageError
  // Show loading spinner only when we have a URL but image isn't loaded yet
  const showLoading = imageUrl && !imageLoaded && !imageError
  // Show placeholder icon only when there's no image at all or error
  const showPlaceholder = !imageUrl || imageError

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {/* Loading spinner - only when loading real image */}
        {showLoading && (
          <div className="absolute inset-0 z-20 bg-gray-100 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Placeholder - only when no image available */}
        {showPlaceholder && (
          <div className="absolute inset-0 z-20 bg-gray-100 flex items-center justify-center">
            <ImageOff className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Real image - only render if we have a URL */}
        {/* Using picture element for true responsive images - smaller on mobile, larger on desktop */}
        {imageUrl && imageUrlLarge && (
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={imageUrlLarge}
            />
            <img
              key={`${property.id}-image`}
              src={imageUrl}
              alt={property.titel}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-all duration-300 ${
                showImage ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </picture>
        )}
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
            <Link href={`/immobilien/${property.id}`}>
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
            href={`/immobilien/${property.id}`}
            className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  )
}
