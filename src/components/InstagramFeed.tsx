'use client'

import { Instagram, ArrowRight, Camera, Heart, MessageCircle } from 'lucide-react'

interface InstagramFeedProps {
  username?: string
  // Optional: SnapWidget ID - get it free at snapwidget.com
  snapWidgetId?: string
}

export default function InstagramFeed({
  username = 'mezzarano.wuestenrotimmobilien',
  snapWidgetId
}: InstagramFeedProps) {
  const instagramUrl = `https://www.instagram.com/${username}`

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
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

        {/* Content */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {snapWidgetId ? (
            // SnapWidget Embed (free - get your ID at snapwidget.com)
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <iframe
                src={`https://snapwidget.com/embed/${snapWidgetId}`}
                className="w-full border-0"
                style={{ height: '450px' }}
                title="Instagram Feed"
                loading="lazy"
                allowTransparency={true}
              />
            </div>
          ) : (
            // Stylish Instagram CTA
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-500/10 to-orange-400/10 rounded-3xl transform rotate-1"></div>

              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="grid md:grid-cols-2">
                  {/* Left: Visual */}
                  <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 md:p-12 text-white">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Instagram className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="text-white/80 text-sm">Folgen Sie uns</div>
                        <div className="font-bold text-lg">@{username}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <Camera className="h-5 w-5 text-white/80" />
                        <span>Aktuelle Immobilienangebote</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-white/80" />
                        <span>Einblicke hinter die Kulissen</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-white/80" />
                        <span>Tipps rund um Immobilien</span>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                      Entdecken Sie mehr auf Instagram
                    </h3>
                    <p className="text-secondary-600 mb-8">
                      Verpassen Sie keine Neuigkeiten! Auf unserem Instagram-Kanal finden Sie
                      aktuelle Immobilienangebote, hilfreiche Tipps und Einblicke aus der
                      Region Trier-Mosel.
                    </p>

                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    >
                      <Instagram className="h-5 w-5" />
                      Jetzt folgen
                      <ArrowRight className="h-5 w-5" />
                    </a>

                    <p className="text-sm text-secondary-400 mt-4 text-center sm:text-left">
                      Öffnet Instagram in einem neuen Tab
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
