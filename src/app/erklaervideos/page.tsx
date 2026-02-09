'use client'

import { useState } from 'react'
import { Play, X, Info, Euro, FileText, Home, Shield } from 'lucide-react'

interface VideoData {
  id: string
  title: string
  description: string
  youtubeId: string
  icon: React.ReactNode
  duration: string
}

const videos: VideoData[] = [
  {
    id: 'maklerkosten',
    title: 'Maklerkosten',
    description: 'Am 23.12.2020 trat das neue Gesetz zur Verteilung der Maklerkosten in Kraft. Erfahren Sie, was das für Verkäufer, Käufer und Immobilienmakler konkret bedeutet und wie die Kosten fair aufgeteilt werden.',
    youtubeId: 'oaJBZd-kCx0',
    icon: <Euro className="w-8 h-8" />,
    duration: '2:30'
  },
  {
    id: 'widerrufsrecht',
    title: 'Widerrufsrecht',
    description: 'Die Widerrufsbelehrung ist ein wichtiger Bestandteil des Maklervertrags. Erfahren Sie, weshalb die gesetzliche Belehrungspflicht eingehalten werden muss und welche Rechte Sie als Kunde haben.',
    youtubeId: 'LqBfsfTaoYI',
    icon: <FileText className="w-8 h-8" />,
    duration: '2:15'
  },
  {
    id: 'preisermittlung',
    title: 'Preisermittlung',
    description: 'Wie wird ein marktgerechter Preis für Ihre Immobilie ermittelt? Unser Erklärvideo zeigt Ihnen die wichtigsten Faktoren und Methoden der professionellen Immobilienbewertung.',
    youtubeId: 'fEQ-SkOf8xo',
    icon: <Home className="w-8 h-8" />,
    duration: '3:00'
  },
  {
    id: 'profivermietung',
    title: 'Sicherheit beim Vermieten',
    description: 'Professionelle Vermietung durch zuverlässige Partner. Erfahren Sie, wie Sie Ihre Immobilie sicher vermieten und welche Vorteile eine professionelle Verwaltung bietet.',
    youtubeId: 't5NGOTqnjPU',
    icon: <Shield className="w-8 h-8" />,
    duration: '2:45'
  }
]

export default function ErklaervideosPage() {
  const [activeVideo, setActiveVideo] = useState<VideoData | null>(null)

  const openVideo = (video: VideoData) => {
    setActiveVideo(video)
  }

  const closeVideo = () => {
    setActiveVideo(null)
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-6">
              Wissen kompakt erklärt
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Erklärvideos
            </h1>
            <p className="text-lg md:text-xl text-secondary-300 leading-relaxed">
              Immobilienthemen auf den Punkt gebracht. Informieren Sie sich bequem per Video –
              wann und wo Sie möchten.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div
                  className="relative aspect-video bg-secondary-900 cursor-pointer overflow-hidden"
                  onClick={() => openVideo(video)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-600 transition-all duration-300 shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center">
                      {video.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-500 transition-colors">
                        {video.title}
                      </h2>
                      <p className="text-secondary-600 leading-relaxed">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openVideo(video)}
                    className="mt-6 w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Video ansehen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-500 rounded-2xl mb-6">
              <Info className="w-8 h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
              Haben Sie noch Fragen?
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Unsere Erklärvideos geben Ihnen einen ersten Überblick. Für eine persönliche
              Beratung zu Ihrer individuellen Situation stehe ich Ihnen gerne zur Verfügung.
            </p>
            <a href="/kontakt" className="btn-primary inline-flex items-center gap-2">
              Kostenlose Beratung anfragen
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-primary-400 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
