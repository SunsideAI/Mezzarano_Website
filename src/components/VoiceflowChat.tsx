'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: {
          verify: { projectID: string }
          url: string
          versionID: string
          voice: { url: string }
          launch: {
            event: {
              type: string
              payload: { url: string }
            }
          }
        }) => Promise<void>
        open: () => void
        proactive: {
          clear: () => void
          push: (message: { type: string; payload: { message: string } }) => void
        }
        destroy: () => void
      }
    }
  }
}

export default function VoiceflowChat() {
  const pathname = usePathname()
  const isInitialized = useRef(false)
  const currentPath = useRef(pathname)

  // Function to initialize/reload the chat with current URL
  const initializeChat = () => {
    if (!window.voiceflow?.chat) return

    window.voiceflow.chat.load({
      verify: { projectID: '698b440e15525bcbe895d1e4' },
      url: 'https://general-runtime.voiceflow.com',
      versionID: 'production',
      voice: {
        url: 'https://runtime-api.voiceflow.com'
      },
      launch: {
        event: {
          type: 'launch',
          payload: {
            url: window.location.href
          }
        }
      }
    }).then(() => {
      const isPropertyPage = window.location.pathname.startsWith('/immobilie/')

      // Proaktive Nachricht je nach Seitenart
      setTimeout(() => {
        window.voiceflow.chat.proactive.clear()
        if (isPropertyPage) {
          window.voiceflow.chat.proactive.push({
            type: 'text',
            payload: {
              message: 'Diese Immobilie könnte Ihr neues Zuhause sein! Ich beantworte alle Fragen und sende Ihnen alle Details – starten Sie jetzt!🏡😊'
            }
          })
        } else {
          window.voiceflow.chat.proactive.push({
            type: 'text',
            payload: {
              message: 'Ich bin Ihre intelligente Assistentin Sophia! Immobilien kaufen, verkaufen oder bewerten? Ich helfe Ihnen sofort – starten Sie jetzt!🏡😊'
            }
          })
        }
      }, 1000)

      // Chat-Öffnungszähler aus localStorage abrufen (nur beim ersten Laden)
      if (!isInitialized.current) {
        isInitialized.current = true
        let openCount = parseInt(localStorage.getItem('chatOpenCount') || '0', 10)

        if (openCount < 1) {
          setTimeout(() => {
            window.voiceflow.chat.open()
            localStorage.setItem('chatOpenCount', String(openCount + 1))
          }, 5000)
        } else if (openCount < 2) {
          setTimeout(() => {
            window.voiceflow.chat.open()
            localStorage.setItem('chatOpenCount', String(openCount + 1))
          }, 12000)
        }

        // chatOpenCount nach 5 Minuten zurücksetzen
        setInterval(() => {
          localStorage.removeItem('chatOpenCount')
        }, 300000)
      }
    })
  }

  // Initial script loading
  useEffect(() => {
    if (document.getElementById('voiceflow-widget')) {
      // Script already loaded, just initialize
      initializeChat()
      return
    }

    const script = document.createElement('script')
    script.id = 'voiceflow-widget'
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'

    script.onload = () => {
      initializeChat()
    }

    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }
  }, [])

  // Re-initialize chat when pathname changes
  useEffect(() => {
    if (currentPath.current !== pathname && window.voiceflow?.chat) {
      currentPath.current = pathname
      // Small delay to ensure the new page is loaded
      setTimeout(() => {
        initializeChat()
      }, 100)
    }
  }, [pathname])

  return null
}
