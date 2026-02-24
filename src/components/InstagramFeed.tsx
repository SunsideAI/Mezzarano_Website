'use client'

import { Instagram, ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface InstagramFeedProps {
  username?: string
  elfsightWidgetId?: string
}

export default function InstagramFeed({
  username = 'mezzarano.immobilien',
  elfsightWidgetId
}: InstagramFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Elfsight script if widget ID is provided
    if (elfsightWidgetId && typeof window !== 'undefined') {
      const existingScript = document.querySelector('script[src*="elfsight"]')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.async = true
        document.body.appendChild(script)
      }
    }
  }, [elfsightWidgetId])

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
            <Instagram className="h-6 w-6" />
            <span className="font-semibold">@{username}</span>
          </div>
          <h2 className="section-title mb-4">Folgen Sie uns auf Instagram</h2>
          <p className="section-subtitle mx-auto">
            Bleiben Sie auf dem Laufenden - Immobilien-Tipps, neue Objekte und Einblicke aus der Region
          </p>
        </div>

        {/* Instagram Widget */}
        <div className="max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {elfsightWidgetId ? (
            // Elfsight Widget
            <div
              ref={containerRef}
              className={`elfsight-app-${elfsightWidgetId}`}
            />
          ) : (
            // Fallback: Stylish placeholder with Instagram link
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Instagram-style Grid Placeholder */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative group cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-pink-500/80 to-orange-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Instagram className="h-8 w-8 text-white" />
                    </div>
                    {/* Placeholder pattern */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 text-center border-t border-gray-100">
                <a
                  href={`https://www.instagram.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                  Auf Instagram folgen
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Instagram Handle Link */}
        <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="200">
          <a
            href={`https://www.instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <span>Mehr auf Instagram entdecken</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
