'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

// Base64 encoded tiny placeholder - loads instantly without network request
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA0MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIGZpbGw9IiM0YjU1NjMiLz48cmVjdCB5PSIxNSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMWYyOTM3Ii8+PC9zdmc+'

const regions = [
  {
    name: 'Hermeskeil',
    href: '/regionen/hermeskeil',
    image: '/images/regionen/Hermeskeil.jpg',
  },
  {
    name: 'Trier',
    href: '/regionen/trier',
    image: '/images/regionen/Trier.jpg',
  },
  {
    name: 'Bernkastel-Kues',
    href: '/regionen/bernkastel-kues',
    image: '/images/regionen/Bernkastel.jpg',
  },
  {
    name: 'Schweich',
    href: '/regionen/schweich',
    image: '/images/regionen/Schweich.jpg',
  },
  {
    name: 'Saarburg',
    href: '/regionen/saarburg',
    image: '/images/regionen/Saarburg.png',
  },
  {
    name: 'Bitburg',
    href: '/regionen/bitburg',
    image: '/images/regionen/Bittburg.png',
  },
  {
    name: 'Konz',
    href: '/regionen/konz',
    image: '/images/regionen/Konz.png',
  },
  {
    name: 'Wittlich',
    href: '/regionen/wittlich',
    image: '/images/regionen/Wittlich.png',
  },
  {
    name: 'Hochwald',
    href: '/regionen/hochwald',
    image: '/images/regionen/Hermeskeil.jpg', // TODO: Replace with Hochwald/forest image
  },
]

export default function RegionsGrid() {
  const [expanded, setExpanded] = useState(false)

  const visibleRegions = expanded ? regions : regions.slice(0, 4)
  const hiddenCount = regions.length - 4

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visibleRegions.map((region, index) => (
          <Link
            key={region.name}
            href={region.href}
            className="relative group overflow-hidden rounded-xl aspect-[4/3] img-zoom bg-secondary-800"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <Image
              src={region.image}
              alt={`Immobilien in ${region.name} - Mezzarano Immobilien`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={index < 4}
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg">{region.name}</h3>
              <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-primary-400 transition-colors">
                Immobilien entdecken
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-medium rounded-none transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-5 w-5" />
                Weniger anzeigen
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5" />
                Weitere {hiddenCount} Regionen entdecken
              </>
            )}
          </button>
        </div>
      )}
    </>
  )
}
