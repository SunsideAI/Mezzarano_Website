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
    AOS.init({
      // Animation settings
      duration: 600,        // Animation duration in ms
      easing: 'ease-out-cubic', // Smooth easing
      once: true,           // Only animate once
      offset: 50,           // Offset from viewport
      delay: 0,             // Default delay

      // Disable on mobile for better performance (optional)
      // disable: 'mobile',

      // Start event
      startEvent: 'DOMContentLoaded',
    })

    // Refresh AOS when images load (important for proper positioning)
    window.addEventListener('load', () => {
      AOS.refresh()
    })

    return () => {
      window.removeEventListener('load', () => {
        AOS.refresh()
      })
    }
  }, [])

  return null
}
