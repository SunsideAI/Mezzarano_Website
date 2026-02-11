'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  const lightboxRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // No fallback images - if no images, show placeholder
  const hasImages = images.length > 0
  const allImages = images
  const useUnoptimized = hasImages && allImages.some(isProxyImage)

  // If no images, show placeholder
  if (!hasImages) {
    return (
      <div className="bg-white rounded-fenster overflow-hidden shadow-xl">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-warmgrau flex items-center justify-center">
          <div className="text-center text-wuestennacht-hover">
            <ImageOff className="w-16 h-16 mx-auto mb-2" />
            <p>Keine Bilder verfügbar</p>
          </div>
        </div>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement
    setCurrentIndex(index)
    setIsLightboxOpen(true)
    setIsGridView(false)
  }, [])

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false)
    previousFocusRef.current?.focus()
  }, [])

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnail = thumbnailRef.current.children[currentIndex] as HTMLElement
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentIndex])

  // Keyboard navigation + focus trap for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    // Focus the lightbox container on open
    lightboxRef.current?.focus()

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') closeLightbox()

      // Focus trap
      if (e.key === 'Tab' && lightboxRef.current) {
        const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen, closeLightbox])

  return (
    <>
      {/* Main Gallery Container */}
      <div className="bg-white rounded-fenster overflow-hidden shadow-xl">
        {/* Main Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-warmgrau">
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
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-muenze flex items-center justify-center shadow-lg transition-all hover:scale-105 group"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6 text-wuestennacht-light group-hover:text-wuestenrot transition-colors" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-muenze flex items-center justify-center shadow-lg transition-all hover:scale-105 group"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6 text-wuestennacht-light group-hover:text-wuestenrot transition-colors" />
              </button>
            </>
          )}

          {/* Top Right Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            {allImages.length > 1 && (
              <button
                onClick={() => { setIsLightboxOpen(true); setIsGridView(true); }}
                className="bg-white/95 hover:bg-white text-wuestennacht-light hover:text-wuestenrot px-4 py-2 rounded-muenze flex items-center gap-2 shadow-lg transition-all text-sm font-medium"
              >
                <Grid3X3 className="w-4 h-4" />
                Alle {allImages.length} Fotos
              </button>
            )}
            <button
              onClick={() => openLightbox(currentIndex)}
              className="bg-white/95 hover:bg-white text-wuestennacht-light hover:text-wuestenrot p-2 rounded-muenze shadow-lg transition-all"
              aria-label="Vollbild"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Image Counter - Bottom Left */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-muenze text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="p-4 bg-warmgrau border-t border-warmgrau">
            <div
              ref={thumbnailRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary-300 scrollbar-track-transparent"
            >
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-fenster overflow-hidden transition-all duration-200 ${
                    index === currentIndex
                      ? 'ring-2 ring-wuestenrot ring-offset-2 scale-105'
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
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Bildergalerie: ${title}`}
          tabIndex={-1}
          className="fixed inset-0 z-50 bg-black"
        >
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
                    className={`px-4 py-2 rounded-muenze flex items-center gap-2 transition-all text-sm font-medium ${
                      isGridView
                        ? 'bg-white text-wuestennacht'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    {isGridView ? 'Slideshow' : 'Alle Fotos'}
                  </button>
                )}
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-muenze flex items-center justify-center transition-colors"
                  aria-label="Bildergalerie schließen"
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
                    className="relative aspect-[4/3] rounded-fenster overflow-hidden group"
                  >
                    <Image
                      src={image}
                      alt={`${title} - Bild ${index + 1}`}
                      fill
                      unoptimized={useUnoptimized}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-muenze">
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
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-muenze flex items-center justify-center transition-all"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="w-8 h-8 text-white" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-muenze flex items-center justify-center transition-all"
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
                      className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-fenster overflow-hidden transition-all duration-200 ${
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
