'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    // Add js-enabled class to enable animations (content is visible by default without JS)
    document.documentElement.classList.add('js-enabled')

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fade-up, .animate-fade-down, .animate-fade-left, .animate-fade-right, .animate-zoom-in, .animate-flip-up, .animate-blur-in, .stagger-children, .card-animate, .text-reveal, .counter-animate'
    )

    if (animatedElements.length === 0) return

    // Immediately make elements in viewport visible
    const checkInitialVisibility = () => {
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        }
      })
    }

    // Run immediately to show above-fold content
    checkInitialVisibility()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}
