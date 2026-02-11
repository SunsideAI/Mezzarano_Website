'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, Grid, List, X, Loader2 } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import AirtablePropertyCard from '@/components/AirtablePropertyCard'
import { properties as staticProperties, Property } from '@/data/properties'
import { AirtableProperty } from '@/lib/airtable'
import AOS from 'aos'

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
  const totalCount = hasAirtableData
    ? filteredAirtableProperties.length
    : filteredStaticProperties.length

  // Refresh AOS when properties change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }
  }, [airtableProperties, filteredStaticProperties, filteredAirtableProperties])

  return (
    <div className="min-h-screen bg-warmgrau">
      {/* Header */}
      <section className="bg-wuestennacht py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold font-ww-bold text-white mb-4" data-aos="fade-up">
            Immobilien
          </h1>
          <p className="text-xl text-white/70" data-aos="fade-up" data-aos-delay="100">
            Finden Sie Ihr perfektes Zuhause in der Region Hermeskeil, Trier und Mosel
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white shadow-md sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-wuestennacht-hover" />
              <input
                type="text"
                placeholder="Standort suchen..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-fenster border transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-wuestenrot text-white border-wuestenrot'
                    : 'bg-white text-wuestennacht-light border-warmgrau hover:border-wuestenrot/30'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-wuestenrot text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2.5 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot focus:border-transparent"
              >
                <option value="newest">Neueste zuerst</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
                <option value="area-asc">Fläche aufsteigend</option>
                <option value="area-desc">Fläche absteigend</option>
              </select>

              {/* View Toggle */}
              <div className="hidden md:flex items-center border border-warmgrau rounded-fenster overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-wuestenrot text-white' : 'text-wuestennacht-light hover:bg-warmgrau'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-wuestenrot text-white' : 'text-wuestennacht-light hover:bg-warmgrau'}`}
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
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Art</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
                  >
                    <option value="">Alle</option>
                    <option value="kauf">Kaufen</option>
                    <option value="miete">Mieten</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Typ</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
                  >
                    <option value="">Alle</option>
                    <option value="wohnung">Wohnung</option>
                    <option value="haus">Haus</option>
                    <option value="villa">Villa</option>
                    <option value="gewerbe">Gewerbe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Min. Preis</label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Max. Preis</label>
                  <input
                    type="number"
                    placeholder="€"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Min. Fläche</label>
                  <input
                    type="number"
                    placeholder="m²"
                    value={filters.minArea}
                    onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-wuestennacht-light mb-1">Min. Zimmer</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-warmgrau rounded-fenster focus:ring-2 focus:ring-wuestenrot"
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
                  className="mt-4 text-sm text-wuestenrot hover:text-wuestenrot flex items-center gap-1"
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
      <section className="py-12">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between">
            {isLoadingAirtable ? (
              <div className="flex items-center gap-2 text-wuestennacht-hover">
                <Loader2 className="h-4 w-4 animate-spin" />
                Lade Immobilien...
              </div>
            ) : (
              <p className="text-wuestennacht-light">
                <span className="font-semibold text-wuestennacht">{totalCount}</span> Immobilien gefunden
              </p>
            )}
          </div>

          {/* Show Airtable properties if available */}
          {hasAirtableData && filteredAirtableProperties.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12'
                : 'flex flex-col gap-6 mb-12'
            }>
              {filteredAirtableProperties.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)}>
                  <AirtablePropertyCard property={property} priority={index < 4} />
                </div>
              ))}
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
                <div key={index} className="bg-white rounded-fenster shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-warmgrau" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-warmgrau rounded w-3/4" />
                    <div className="h-4 bg-warmgrau rounded w-1/2" />
                    <div className="h-4 bg-warmgrau rounded w-full" />
                    <div className="h-8 bg-warmgrau rounded w-1/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show static properties ONLY if loading finished AND no Airtable data */}
          {!isLoadingAirtable && !hasAirtableData && filteredStaticProperties.length > 0 && (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'flex flex-col gap-6'
            }>
              {filteredStaticProperties.map((property, index) => (
                <div key={property.id} data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          {/* No results */}
          {totalCount === 0 && !isLoadingAirtable && (
            <div className="text-center py-16" data-aos="fade-up">
              <div className="w-16 h-16 bg-warmgrau rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-wuestennacht-hover" />
              </div>
              <h3 className="text-xl font-semibold font-ww-bold text-wuestennacht mb-2">
                Keine Ergebnisse gefunden
              </h3>
              <p className="text-wuestennacht-light mb-4">
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
