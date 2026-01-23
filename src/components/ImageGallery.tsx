'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const allImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80']

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Image */}
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden bg-secondary-800 aspect-[16/10]">
          <Image
            src={allImages[currentIndex]}
            alt={`${title} - Bild ${currentIndex + 1}`}
            fill
            className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => openLightbox(currentIndex)}
            priority
          />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-6 h-6 text-secondary-900" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-6 h-6 text-secondary-900" />
              </button>
            </>
          )}

          {/* Image Counter & Expand Button */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {allImages.length}
            </span>
            <button
              onClick={() => openLightbox(currentIndex)}
              className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
              aria-label="Vollbild öffnen"
            >
              <Expand className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="lg:col-span-1 grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-3 max-h-[500px] overflow-y-auto">
          {allImages.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-3 ring-primary-500 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === 5 && allImages.length > 6 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{allImages.length - 6}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            aria-label="Schließen"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Nächstes Bild"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto p-4">
            <Image
              src={allImages[currentIndex]}
              alt={`${title} - Bild ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-3 rounded-full text-sm font-medium">
            {currentIndex + 1} / {allImages.length}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-black'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
