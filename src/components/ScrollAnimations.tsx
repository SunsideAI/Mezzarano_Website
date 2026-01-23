'use client'

import { useEffect } from 'react'

/**
 * ScrollAnimations - adds 'visible' class to elements when they enter viewport
 * Note: All content is visible by default. This only adds visual enhancements.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        '.animate-on-scroll, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-zoom-in, .stagger-children'
      )

      // Add visible class to all elements immediately
      // This ensures content is always shown even if IntersectionObserver has issues
      elements.forEach((el) => el.classList.add('visible'))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
