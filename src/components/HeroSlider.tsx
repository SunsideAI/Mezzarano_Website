'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Star, ArrowRight } from 'lucide-react'

interface Slide {
  image: string
  headline: string
  highlightedText: string
  subheadline: string
}

const slides: Slide[] = [
  {
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/v1770755468/Junges-Paar-vor-ihrem-neuen-Zuhause-lachend-und-gluecklich-im-Garten-2048x1180_rf6uvn.jpg',
    headline: 'Immobilien verkaufen – ',
    highlightedText: 'kompetent und persönlich',
    subheadline: 'Ihr Wüstenrot Immobilienexperte in Hermeskeil. Professionelle Beratung für die Region Trier, Hochwald und Mosel.',
  },
  {
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/v1770755465/Ein-Paar-informiert-sich-online-ueber-den-Wert-ihrer-Immobilie-2048x1180_e9ukmv.jpg',
    headline: 'Ihr Traumhaus finden – ',
    highlightedText: 'mit lokaler Expertise',
    subheadline: 'Von der Eigentumswohnung bis zum Einfamilienhaus – ich begleite Sie persönlich durch den gesamten Kaufprozess.',
  },
  {
    image: 'https://res.cloudinary.com/djqviyb2c/image/upload/v1770755444/Junges-Paar-freut-sich-ueber-die-gekaufte-Immobilie-2048x1180_ftna2g.jpg',
    headline: 'Wüstenrot Partner – ',
    highlightedText: 'Finanzierung aus einer Hand',
    subheadline: 'Profitieren Sie von attraktiven Finanzierungslösungen und umfassender Beratung durch das Wüstenrot-Netzwerk.',
  },
]

const SLIDE_DURATION = 8000 // 8 seconds per slide

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [textVisible, setTextVisible] = useState(true)

  const goToSlide = useCallback((index: number) => {
    setTextVisible(false)
    setTimeout(() => {
      setCurrentSlide(index)
      setProgress(0)
      setTimeout(() => setTextVisible(true), 100)
    }, 400)
  }, [])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide])

  // Progress animation with performance.now() for smooth, precise timing
  const startTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(newProgress)

      if (newProgress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        nextSlide()
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [currentSlide, nextSlide])

  const circumference = 2 * Math.PI * 18 // radius = 18

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Ken Burns */}
          <div className={`absolute inset-0 ${index === currentSlide ? 'animate-ken-burns' : ''}`}>
            <Image
              src={slide.image}
              alt={`${slide.headline} ${slide.highlightedText}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              quality={80}
            />
          </div>
          {/* Gradient Overlay - Styleguide: wüstennacht */}
          <div className="absolute inset-0 bg-gradient-to-r from-wuestennacht/95 via-wuestennacht/80 to-wuestennacht/50" />
        </div>
      ))}

      {/* Content */}
      <div className="container-custom relative z-20 py-12 md:py-20">
        <div className="max-w-3xl">
          {/* Rating Badge */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-wuestenrot text-wuestenrot" />
              ))}
            </div>
            <span className="text-white/80 text-sm">Ihr vertrauensvoller Partner</span>
          </div>

          {/* Headline - Styleguide: wüstenrot Akzent */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-headline transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {slides[currentSlide].headline}
            <span className="text-wuestenrot">{slides[currentSlide].highlightedText}</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-white/80 mb-10 max-w-2xl transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {slides[currentSlide].subheadline}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionDelay: '450ms' }}
          >
            <Link href="/kontakt" className="btn-primary btn-shine group">
              Kostenlose Beratung
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:01776542977"
              className="btn-outline group"
            >
              <Phone className="mr-2 h-5 w-5" />
              0177 6542977
            </a>
          </div>
        </div>
      </div>

      {/* Circular Progress Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-12 h-12 flex items-center justify-center group"
          >
            <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="2"
              />
              {/* Progress circle */}
              <circle
                cx="24"
                cy="24"
                r="18"
                fill="none"
                stroke="#F84914"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={
                  index === currentSlide
                    ? circumference - (progress / 100) * circumference
                    : circumference
                }
              />
            </svg>
            <span
              className={`font-semibold text-sm transition-colors ${
                index === currentSlide ? 'text-white' : 'text-white/50 group-hover:text-white/80'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Progress Dots - Münze-Form */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex md:hidden gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-muenze transition-all ${
              index === currentSlide
                ? 'bg-wuestenrot w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 z-30 hidden md:flex items-center gap-3 text-white/60">
        <div className="w-px h-16 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-down" />
        </div>
        <span className="text-xs uppercase tracking-wider rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </div>
    </section>
  )
}
