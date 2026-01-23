'use client'

import { useEffect } from 'react'

/**
 * ScrollAnimations - triggers animations when elements scroll into view
 * CSS animations run automatically on page load for above-fold content.
 * This component adds 'in-view' class for scroll-triggered enhancements.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    // Only run IntersectionObserver for scroll-triggered animations
    const scrollElements = document.querySelectorAll('.animate-on-scroll')

    if (scrollElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target) // Only animate once
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    scrollElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
