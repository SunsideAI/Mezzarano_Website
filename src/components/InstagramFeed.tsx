'use client'

import { Instagram, ArrowRight, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

interface InstagramFeedProps {
  username?: string
  elfsightWidgetId?: string
}

export default function InstagramFeed({
  username = 'mezzarano.wuestenrotimmobilien',
  elfsightWidgetId
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Skip API fetch if using Elfsight
    if (elfsightWidgetId) {
      setLoading(false)
      return
    }

    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram')
        const data = await response.json()

        if (data.success && data.posts.length > 0) {
          setPosts(data.posts)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Failed to fetch Instagram posts:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [elfsightWidgetId])

  // Load Elfsight script if widget ID is provided
  useEffect(() => {
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

        {/* Instagram Content */}
        <div className="max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {elfsightWidgetId ? (
            // Elfsight Widget
            <div className={`elfsight-app-${elfsightWidgetId}`} />
          ) : loading ? (
            // Loading State
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            </div>
          ) : posts.length > 0 ? (
            // Real Instagram Posts
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1">
                {posts.slice(0, 8).map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square relative group cursor-pointer overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={post.media_type === 'VIDEO' ? (post.thumbnail_url || post.media_url) : post.media_url}
                      alt={post.caption?.slice(0, 100) || 'Instagram Post'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {post.media_type === 'VIDEO' ? (
                        <Play className="h-10 w-10 text-white" fill="white" />
                      ) : (
                        <Instagram className="h-8 w-8 text-white" />
                      )}
                    </div>
                    {/* Video indicator */}
                    {post.media_type === 'VIDEO' && (
                      <div className="absolute top-2 right-2">
                        <Play className="h-5 w-5 text-white drop-shadow-lg" fill="white" />
                      </div>
                    )}
                    {/* Carousel indicator */}
                    {post.media_type === 'CAROUSEL_ALBUM' && (
                      <div className="absolute top-2 right-2">
                        <svg className="h-5 w-5 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 6h2v12H4V6zm4-2h12v12H8V4zm2 2v8h8V6h-8z"/>
                        </svg>
                      </div>
                    )}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 text-center border-t border-gray-100">
                <a
                  href={instagramUrl}
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
          ) : (
            // Fallback: Clean CTA without placeholder images
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center">
                <Instagram className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                Entdecken Sie unseren Instagram-Kanal
              </h3>
              <p className="text-secondary-600 mb-8 max-w-md mx-auto">
                Aktuelle Immobilien, Einblicke hinter die Kulissen und hilfreiche Tipps rund um den Immobilienkauf in der Region Trier-Mosel.
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
                @{username} folgen
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>

        {/* Bottom Link (only show if posts are displayed) */}
        {posts.length > 0 && (
          <div className="text-center mt-8" data-aos="fade-up" data-aos-delay="200">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-secondary-600 hover:text-primary-600 transition-colors"
            >
              <span>Mehr auf Instagram entdecken</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
