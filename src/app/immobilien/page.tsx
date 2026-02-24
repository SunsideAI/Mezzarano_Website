'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Grid, List, X, ChevronLeft, ChevronRight, Bell } from 'lucide-react'
import PropertyCard from '@/components/PropertyCard'
import { properties } from '@/data/properties'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc'

const ITEMS_PER_PAGE = 9

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

  const filteredProperties = useMemo(() => {
    let result = [...properties]

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

  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

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

  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '...')[] = []
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
    return pages
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary-900 py-16">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Immobilien
          </h1>
          <p className="text-xl text-gray-300">
            Finden Sie Ihr perfektes Zuhause aus unserem exklusiven Portfolio
          </p>
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                  showFilters || activeFilterCount > 0
                    ? 'bg-primary-700 text-white border-primary-700'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                }`}
              >
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filter</span>
                {activeFilterCount > 0 && (
                  <span className="bg-gold-400 text-white text-xs px-2 py-0.5 rounded-full">
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
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
                  className="mt-4 text-sm text-primary-700 hover:text-primary-800 flex items-center gap-1"
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
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProperties.length}</span> Immobilien gefunden
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Seite {currentPage} von {totalPages}
              </p>
            )}
          </div>

          {filteredProperties.length > 0 ? (
            <>
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'flex flex-col gap-6'
              }>
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}

                {/* Suchprofil Tile */}
                <Link
                  href="/suchprofil"
                  className={`group relative bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'p-10 min-h-[160px]' : 'p-8 min-h-[360px]'
                  }`}
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`relative flex ${viewMode === 'list' ? 'flex-row items-center gap-8' : 'flex-col items-center'}`}>
                    <div className={`bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0 ${
                      viewMode === 'list' ? 'w-14 h-14' : 'w-16 h-16 mb-5'
                    }`}>
                      <Bell className={viewMode === 'list' ? 'h-7 w-7 text-white' : 'h-8 w-8 text-white'} />
                    </div>
                    <div className={viewMode === 'list' ? 'text-left' : ''}>
                      <h3 className={`font-serif font-bold text-white mb-2 ${viewMode === 'list' ? 'text-xl' : 'text-2xl mb-3'}`}>
                        Nicht das Passende gefunden?
                      </h3>
                      <p className={`text-white/80 leading-relaxed ${viewMode === 'list' ? 'text-sm mb-4' : 'text-sm mb-6'}`}>
                        Legen Sie jetzt Ihr persönliches Suchprofil an und wir melden uns, sobald ein passendes Objekt verfügbar ist.
                      </p>
                      <span className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-2.5 rounded-full group-hover:bg-gold-50 transition-colors text-sm">
                        Suchprofil anlegen
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Vorherige Seite"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>

                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary-700 text-white shadow-sm'
                            : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Nächste Seite"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Keine Ergebnisse gefunden
              </h3>
              <p className="text-gray-600 mb-6">
                Versuchen Sie, Ihre Filterkriterien anzupassen
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={resetFilters} className="btn-primary">
                  Filter zurücksetzen
                </button>
                <Link href="/suchprofil" className="btn-secondary">
                  Suchprofil anlegen
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
