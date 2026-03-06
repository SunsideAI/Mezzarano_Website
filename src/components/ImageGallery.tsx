'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Grid3X3, Maximize2, ImageOff } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

// Check if image is from our proxy API
const isProxyImage = (url: string) => url.startsWith('/api/')

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isGridView, setIsGridView] = useState(false)
  const thumbnailRef = useRef<HTMLDivElement>(null)

  // No fallback images - if no images, show placeholder
  const hasImages = images.length > 0
  const allImages = images
  const useUnoptimized = hasImages && allImages.some(isProxyImage)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
    setIsGridView(false)
  }

  // Scroll thumbnail into view
  useEffect(() => {
    if (!hasImages) return
    if (thumbnailRef.current) {
      const thumbnail = thumbnailRef.current.children[currentIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentIndex, hasImages])

  // Keyboard navigation
  useEffect(() => {
    if (!hasImages) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, hasImages])

  // If no images, show placeholder
  if (!hasImages) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageOff className="w-16 h-16 mx-auto mb-2" />
            <p>Keine Bilder verfügbar</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery Container */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Main Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-secondary-100">
          <Image
            src={allImages[currentIndex]}
            alt={`${title} - Bild ${currentIndex + 1}`}
            fill
            unoptimized={useUnoptimized}
            className="object-cover cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
            priority
          />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 group"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6 text-secondary-700 group-hover:text-primary-500 transition-colors" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 group"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6 text-secondary-700 group-hover:text-primary-500 transition-colors" />
              </button>
            </>
          )}

          {/* Top Right Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            {allImages.length > 1 && (
              <button
                onClick={() => { setIsLightboxOpen(true); setIsGridView(true); }}
                className="bg-white/95 hover:bg-white text-secondary-700 hover:text-primary-500 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all text-sm font-medium"
              >
                <Grid3X3 className="w-4 h-4" />
                Alle {allImages.length} Fotos
              </button>
            )}
            <button
              onClick={() => openLightbox(currentIndex)}
              className="bg-white/95 hover:bg-white text-secondary-700 hover:text-primary-500 p-2 rounded-full shadow-lg transition-all"
              aria-label="Vollbild"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Image Counter - Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="p-4 bg-secondary-50 border-t border-secondary-100">
            <div
              ref={thumbnailRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary-300 scrollbar-track-transparent"
            >
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                    index === currentIndex
                      ? 'ring-2 ring-primary-500 ring-offset-2 scale-105'
                      : 'opacity-70 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    unoptimized={useUnoptimized}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox / Fullscreen View */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="text-white">
                <h3 className="font-semibold text-lg">{title}</h3>
                {!isGridView && (
                  <p className="text-white/70 text-sm">{currentIndex + 1} von {allImages.length} Fotos</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {allImages.length > 1 && (
                  <button
                    onClick={() => setIsGridView(!isGridView)}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all text-sm font-medium ${
                      isGridView
                        ? 'bg-white text-secondary-900'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    {isGridView ? 'Slideshow' : 'Alle Fotos'}
                  </button>
                )}
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Schließen"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {isGridView ? (
            /* Grid View */
            <div className="h-full pt-20 pb-6 px-6 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => { setCurrentIndex(index); setIsGridView(false); }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={image}
                      alt={`${title} - Bild ${index + 1}`}
                      fill
                      unoptimized={useUnoptimized}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Slideshow View */
            <>
              {/* Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="w-8 h-8 text-white" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center pt-16 pb-32">
                <div className="relative w-full h-full max-w-6xl mx-auto px-4">
                  <Image
                    src={allImages[currentIndex]}
                    alt={`${title} - Bild ${currentIndex + 1}`}
                    fill
                    unoptimized={useUnoptimized}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-6">
                <div className="flex justify-center gap-2 px-4 overflow-x-auto max-w-5xl mx-auto">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentIndex
                          ? 'ring-2 ring-white scale-110'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        unoptimized={useUnoptimized}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
