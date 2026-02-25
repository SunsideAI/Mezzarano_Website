'use client'

import Script from 'next/script'
import { Instagram } from 'lucide-react'

interface InstagramFeedProps {
  username?: string
}

export default function InstagramFeed({
  username = 'mezzarano.wuestenrotimmobilien'
}: InstagramFeedProps) {
  const instagramUrl = `https://www.instagram.com/${username}`

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary-600 mb-4 hover:text-primary-700 transition-colors"
          >
            <Instagram className="h-6 w-6" />
            <span className="font-semibold">@{username}</span>
          </a>
          <h2 className="section-title mb-4">Folgen Sie uns auf Instagram</h2>
          <p className="section-subtitle mx-auto">
            Bleiben Sie auf dem Laufenden - Immobilien-Tipps, neue Objekte und Einblicke aus der Region
          </p>
        </div>

        {/* Elfsight Instagram Feed Widget */}
        <div className="max-w-6xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <Script
            src="https://static.elfsight.com/platform/platform.js"
            strategy="lazyOnload"
          />
          <div
            className="elfsight-app-2cdef7ca-f0b3-4c2f-8ea1-75277e14c917"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  )
}
