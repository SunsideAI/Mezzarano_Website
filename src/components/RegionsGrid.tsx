'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

const regions = [
  {
    name: 'Hermeskeil',
    href: '/regionen/hermeskeil',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.29_a8ccel.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.29_a8ccel.png'
  },
  {
    name: 'Trier',
    href: '/regionen/trier',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1769251684/Bildschirmfoto_2026-01-24_um_11.47.56_ozajy1.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1769251684/Bildschirmfoto_2026-01-24_um_11.47.56_ozajy1.png'
  },
  {
    name: 'Bernkastel-Kues',
    href: '/regionen/bernkastel-kues',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.48.04_asqrpt.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.48.04_asqrpt.png'
  },
  {
    name: 'Schweich',
    href: '/regionen/schweich',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.48_jnakga.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1769251685/Bildschirmfoto_2026-01-24_um_11.47.48_jnakga.png'
  },
  {
    name: 'Saarburg',
    href: '/regionen/saarburg',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1770805375/Saarburg_elmn8i.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1770805375/Saarburg_elmn8i.png'
  },
  {
    name: 'Bitburg',
    href: '/regionen/bitburg',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1770805358/Bittburg_tejpzq.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1770805358/Bittburg_tejpzq.png'
  },
  {
    name: 'Konz',
    href: '/regionen/konz',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1770805357/Konz_eqrxqw.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1770805357/Konz_eqrxqw.png'
  },
  {
    name: 'Wittlich',
    href: '/regionen/wittlich',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1770805357/Wittlich_c5qqd9.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1770805357/Wittlich_c5qqd9.png'
  },
  {
    name: 'Hochwald',
    href: '/regionen/hochwald',
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_400,q_70,f_auto/v1770805355/Wald_pxfoka.png',
    blurUrl: 'https://res.cloudinary.com/djqviyb2c/image/upload/w_20,q_20,e_blur:500,f_auto/v1770805355/Wald_pxfoka.png'
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
            className="relative group overflow-hidden rounded-xl aspect-[4/3] img-zoom"
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
              blurDataURL={region.blurUrl}
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 font-medium rounded-lg transition-colors"
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
