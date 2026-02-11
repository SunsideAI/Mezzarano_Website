'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

/**
 * ScrollAnimations - initializes AOS (Animate On Scroll) library
 * AOS is the industry standard for reliable scroll animations
 */
export default function ScrollAnimations() {
  useEffect(() => {
    // BFSG: Reduzierte Bewegung respektieren
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    AOS.init({
      duration: prefersReducedMotion ? 0 : 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      disable: prefersReducedMotion,
      startEvent: 'DOMContentLoaded',
    })

    const handleLoad = () => AOS.refresh()
    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return null
}
