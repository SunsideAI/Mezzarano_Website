'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, SlidersHorizontal, Grid, List, X, Loader2, ChevronLeft, ChevronRight, Bell, ArrowRight, Phone } from 'lucide-react'

const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMxYTIzMmUiLz48L3N2Zz4="
import PropertyCard from '@/components/PropertyCard'
import AirtablePropertyCard from '@/components/AirtablePropertyCard'
import { properties as staticProperties, Property } from '@/data/properties'
import { AirtableProperty } from '@/lib/airtable'
import AOS from 'aos'

const ITEMS_PER_PAGE = 8

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'

export default function ImmobilienPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    bedrooms: '',
    location: '',
  })
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  // Airtable data
  const [airtableProperties, setAirtableProperties] = useState<AirtableProperty[]>([])
  const [isLoadingAirtable, setIsLoadingAirtable] = useState(true)
  const [airtableError, setAirtableError] = useState(false)

  // Fetch Airtable properties
  useEffect(() => {
    const fetchAirtableData = async () => {
      setIsLoadingAirtable(true)
      try {
        const response = await fetch('/api/properties')
        if (response.ok) {
          const data = await response.json()
          setAirtableProperties(data.properties || [])
          setAirtableError(false)
        } else {
          setAirtableError(true)
        }
      } catch (error) {
        console.error('Error fetching Airtable:', error)
        setAirtableError(true)
      } finally {
        setIsLoadingAirtable(false)
      }
    }

    fetchAirtableData()
  }, [])

  // Filter static properties
  const filteredStaticProperties = useMemo(() => {
    let result = [...staticProperties]

    if (filters.type) {
      result = result.filter(p => p.type === filters.type)
    }
    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice))
    }
    if (filters.minArea) {
      result = result.filter(p => p.area >= parseInt(filters.minArea))
    }
    if (filters.bedrooms) {
      result = result.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
    }
    if (filters.location) {
      result = result.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'area-asc':
        result.sort((a, b) => a.area - b.area)
        break
      case 'area-desc':
        result.sort((a, b) => b.area - a.area)
        break
      default:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    }

    return result
  }, [filters, sortBy])

  // Filter Airtable properties
  const filteredAirtableProperties = useMemo(() => {
    let result = [...airtableProperties]

    if (filters.type) {
      const kategorie = filters.type === 'kauf' ? 'Kauf' : 'Miete'
      result = result.filter(p => p.kategorie === kategorie)
    }
    if (filters.category) {
      // Match against objekt_typ or unterkategorie (German labels from Airtable)
      const typeMap: Record<string, string[]> = {
        'wohnung': ['Wohnung'],
        'haus': ['Haus'],
        'villa': ['Haus', 'Villa'],
        'gewerbe': ['Büro/Praxis', 'Gastronomie/Hotel', 'Gewerbe', 'Industrie'],
      }
      const matchingTypes = typeMap[filters.category] || []
      result = result.filter(p => {
        const propType = p.objekt_typ || p.unterkategorie || ''
        return matchingTypes.some(t => propType.includes(t))
      })
    }
    if (filters.minPrice) {
      result = result.filter(p => (p.preis || 0) >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter(p => (p.preis || Infinity) <= parseInt(filters.maxPrice))
    }
    if (filters.minArea) {
      result = result.filter(p => (p.wohnflaeche || 0) >= parseInt(filters.minArea))
    }
    if (filters.bedrooms) {
      result = result.filter(p => (p.zimmer || 0) >= parseInt(filters.bedrooms))
    }
    if (filters.location) {
      result = result.filter(p =>
        (p.ort || '').toLowerCase().includes(filters.location.toLowerCase()) ||
        (p.kurz_adresse || '').toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.preis || 0) - (b.preis || 0))
        break
      case 'price-desc':
        result.sort((a, b) => (b.preis || 0) - (a.preis || 0))
        break
      case 'area-asc':
        result.sort((a, b) => (a.wohnflaeche || 0) - (b.wohnflaeche || 0))
        break
      case 'area-desc':
        result.sort((a, b) => (b.wohnflaeche || 0) - (a.wohnflaeche || 0))
        break
    }

    return result
  }, [airtableProperties, filters, sortBy])

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  // Scroll to results top when page changes
  useEffect(() => {
    if (typeof window !== 'undefined' && currentPage > 1) {
      document.getElementById('immobilien-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage])

  const resetFilters = () => {
    setFilters({
      type: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      bedrooms: '',
      location: '',
    })
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length

  // Use Airtable properties if available, otherwise static
  const hasAirtableData = airtableProperties.length > 0
  const allFiltered = hasAirtableData ? filteredAirtableProperties : filteredStaticProperties
  const totalCount = allFiltered.length
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const paginatedAirtable = filteredAirtableProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const paginatedStatic = filteredStaticProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Page numbers with ellipsis
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  // Refresh AOS when properties change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }
  }, [airtableProperties, filteredStaticProperties, filteredAirtableProperties])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Wüstenrot Layout-Prinzipien */}
      <section className="relative bg-wuestennacht min-h-[450px] md:min-h-[600px] flex items-center py-12 overflow-hidden">
        {/* Background Image - optimized with Next.js Image */}
        <Image
          src="/images/hero/AdobeStock_476608445.jpeg"
          alt=""
          fill
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-wuestennacht/85" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Tagline - Icon + Text in wuestenrot */}
            <div className="flex items-center gap-2 text-wuestenrot mb-6" data-aos="fade-up">
              <Search className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Immobiliensuche
              </span>
            </div>

            {/* Headline with White Bars - keine Abstände zwischen Balken */}
            <h1 className="mb-8" data-aos="fade-up" data-aos-delay="100">
              <span className="flex flex-col items-start gap-0">
                <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none lowercase text-wuestennacht">
                  aktuelle immobilien
                </span>
                <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-2xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                  wüstenrot
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" data-aos="fade-up" data-aos-delay="200">
              Finden Sie Ihr perfektes Zuhause in der Region Hermeskeil, Trier und Mosel – aktuelle Angebote aus dem Wüstenrot-Netzwerk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
              <Link href="/kontakt" className="btn-primary">
                Beratung anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:01776542977" className="btn-outline border-white text-white hover:bg-white hover:text-wuestennacht">
                <Phone className="h-5 w-5 mr-2" />
                0177 6542977
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white shadow-md sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Standort suchen..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[24px] border transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-primary-500 text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="newest">Neueste zuerst</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="area-asc">Fläche aufsteigend</option>
                <option value="area-desc">Fläche absteigend</option>
              </select>

              {/* View Toggle */}
              <div className="hidden md:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Art</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Alle</option>
                    <option value="kauf">Kaufen</option>
                    <option value="miete">Mieten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Typ</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Alle</option>
                    <option value="wohnung">Wohnung</option>
                    <option value="haus">Haus</option>
                    <option value="villa">Villa</option>
                    <option value="gewerbe">Gewerbe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Preis</label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max. Preis</label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Fläche</label>
                  <input
                    type="number"
                    placeholder="m²"
                    value={filters.minArea}
                    onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min. Zimmer</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Alle</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="mt-4 text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Filter zurücksetzen
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results */}
      <section id="immobilien-results" className="py-12">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between">
            {isLoadingAirtable ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Lade Immobilien...
              </div>
            ) : (
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{totalCount}</span> Immobilien gefunden
                {totalPages > 1 && (
                  <span className="ml-2 text-sm text-gray-400">
                    (Seite {currentPage} von {totalPages})
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Show Airtable properties if available */}
          {hasAirtableData && paginatedAirtable.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
                : 'flex flex-col gap-6 mb-12'
            }>
              {paginatedAirtable.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)}>
                  <AirtablePropertyCard property={property} priority={index < 4} />
                </div>
              ))}
              {/* Suchprofil CTA tile – always last in grid */}
              <div data-aos="fade-up" data-aos-delay={Math.min(paginatedAirtable.length * 50, 300)}>
                <SuchprofilTile />
              </div>
            </div>
          )}

          {/* Show loading skeletons while fetching */}
          {isLoadingAirtable && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'flex flex-col gap-6'
            }>
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show static properties ONLY if loading finished AND no Airtable data */}
          {!isLoadingAirtable && !hasAirtableData && paginatedStatic.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'flex flex-col gap-6'
            }>
              {paginatedStatic.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)}>
                  <PropertyCard property={property} />
                </div>
              ))}
              {/* Suchprofil CTA tile */}
              <div data-aos="fade-up" data-aos-delay={Math.min(paginatedStatic.length * 50, 300)}>
                <SuchprofilTile />
              </div>
            </div>
          )}

          {/* Pagination */}
          {!isLoadingAirtable && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-[24px] border border-gray-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Vorherige Seite"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-10 h-10 rounded-[24px] text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'border border-gray-200 hover:border-primary-500 hover:text-primary-500'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-[24px] border border-gray-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Nächste Seite"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* No results */}
          {totalCount === 0 && !isLoadingAirtable && (
            <div className="text-center py-16" data-aos="fade-up">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keine Ergebnisse gefunden
              </h3>
              <p className="text-gray-600 mb-4">
                Versuchen Sie, Ihre Filterkriterien anzupassen
              </p>
              <button onClick={resetFilters} className="btn-primary">
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function SuchprofilTile() {
  return (
    <Link
      href="/suchprofil"
      className="group relative flex flex-col h-full min-h-[320px] rounded-[16px] bg-wuestenrot hover:bg-wuestenrot-hover hover:shadow-xl transition-all duration-300 p-6 overflow-hidden"
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Bell className="h-6 w-6 text-wuestenrot" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
          Nicht das Passende<br />dabei?
        </h3>
        <p className="text-white/80 text-sm leading-relaxed mb-auto">
          Legen Sie jetzt Ihr persönliches Suchprofil an – ich benachrichtige Sie sofort, wenn die richtige Immobilie verfügbar ist.
        </p>

        {/* Button */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-wuestenrot text-sm font-bold group-hover:bg-warmgrau transition-colors">
            <Bell className="h-4 w-4" />
            Suchprofil anlegen
          </span>
        </div>
      </div>
    </Link>
  )
}
