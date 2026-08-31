'use client'

import { useEffect, useState, useRef } from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

interface PropertyMapProps {
  address: string
  city: string
  plz?: string
  region?: string
  lat?: number  // Direct coordinates from CRM
  lng?: number
}

interface Coordinates {
  lat: number
  lng: number
}

export default function PropertyMap({ address, city, plz, region, lat, lng }: PropertyMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  // Use direct coordinates from CRM if available, otherwise geocode
  useEffect(() => {
    // If we have direct coordinates from CRM, use them immediately
    if (lat && lng) {
      setCoordinates({ lat, lng })
      setIsLoading(false)
      return
    }

    const geocodeAddress = async () => {
      setIsLoading(true)
      setError(false)

      // Build search query
      const searchParts = []
      if (address && address !== 'Adresse auf Anfrage') searchParts.push(address)
      if (plz) searchParts.push(plz)
      if (city) searchParts.push(city)
      if (region) searchParts.push(region)
      searchParts.push('Germany')

      const searchQuery = searchParts.join(', ')

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
          {
            headers: {
              'User-Agent': 'MezzaranoImmobilien/1.0'
            }
          }
        )
        const data = await response.json()

        if (data && data.length > 0) {
          setCoordinates({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          })
        } else {
          // Fallback: Try with just city and PLZ
          const fallbackQuery = `${plz || ''} ${city}, Germany`
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fallbackQuery)}&limit=1`,
            {
              headers: {
                'User-Agent': 'MezzaranoImmobilien/1.0'
              }
            }
          )
          const fallbackData = await fallbackResponse.json()

          if (fallbackData && fallbackData.length > 0) {
            setCoordinates({
              lat: parseFloat(fallbackData[0].lat),
              lng: parseFloat(fallbackData[0].lon)
            })
          } else {
            setError(true)
          }
        }
      } catch (err) {
        console.error('Geocoding error:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (city) {
      geocodeAddress()
    } else {
      setIsLoading(false)
      setError(true)
    }
  }, [address, city, plz, region, lat, lng])

  // Initialize map when coordinates are available
  useEffect(() => {
    if (!coordinates || !mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      if (!mapRef.current) return

      const L = (await import('leaflet')).default

      // Create custom marker icon
      const markerIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: #F84914;
            width: 40px;
            height: 40px;
            border-radius: 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(248, 73, 20, 0.4);
            border: 3px solid white;
          ">
            <svg style="transform: rotate(45deg); width: 20px; height: 20px; color: white;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      })

      // Initialize map
      const map = L.map(mapRef.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([coordinates.lat, coordinates.lng], 15)

      // Add OpenStreetMap tiles with a nice style
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
      }).addTo(map)

      // Add marker
      const marker = L.marker([coordinates.lat, coordinates.lng], { icon: markerIcon }).addTo(map)

      // Add popup
      const popupContent = `
        <div style="font-family: system-ui, sans-serif; padding: 4px;">
          <strong style="color: #1f2937; font-size: 14px;">${address || city}</strong>
          <br/>
          <span style="color: #6b7280; font-size: 12px;">${plz ? plz + ' ' : ''}${city}</span>
        </div>
      `
      marker.bindPopup(popupContent)

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [coordinates, address, city, plz])

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address || ''} ${plz || ''} ${city}, Germany`
  )}`

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standort</h2>
        <div className="h-72 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Karte wird geladen...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !coordinates) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Standort</h2>
        <div className="h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
          <div className="text-center px-6">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium mb-1">{city}</p>
            <p className="text-gray-500 text-sm mb-4">{plz ? `${plz} ` : ''}{region || ''}</p>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              In Google Maps öffnen
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Standort</h2>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Route planen
        </a>
      </div>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="h-72 md:h-80 rounded-xl overflow-hidden z-0"
        style={{ background: '#e5e7eb' }}
      />

      {/* Address Info Below Map */}
      <div className="mt-4 flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
        <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium text-gray-900">{address || 'Adresse auf Anfrage'}</p>
          <p className="text-gray-500 text-sm">{plz ? `${plz} ` : ''}{city}{region ? `, ${region}` : ''}</p>
        </div>
      </div>
    </div>
  )
}
