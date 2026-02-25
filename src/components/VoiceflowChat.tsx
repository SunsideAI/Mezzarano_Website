'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    voiceflow?: {
      chat?: {
        load: (config: unknown) => Promise<void>
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

  useEffect(() => {
    // Remove existing widget and script completely
    const existingWidget = document.getElementById('voiceflow-chat')
    if (existingWidget) {
      existingWidget.remove()
    }

    // Destroy existing instance if any
    if (window.voiceflow?.chat?.destroy) {
      try {
        window.voiceflow.chat.destroy()
      } catch (e) {
        // Ignore errors during destroy
      }
    }

    // Remove existing script
    const existingScript = document.getElementById('voiceflow-widget')
    if (existingScript) {
      existingScript.remove()
    }

    // Clear voiceflow from window
    delete window.voiceflow

    // Load fresh script
    const script = document.createElement('script')
    script.id = 'voiceflow-widget'
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'

    script.onload = () => {
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
        const isPropertyPage = window.location.pathname.startsWith('/immobilien/') &&
          window.location.pathname !== '/immobilien/' &&
          window.location.pathname !== '/immobilien'

        // Proaktive Nachricht je nach Seitenart
        setTimeout(() => {
          if (!window.voiceflow?.chat) return
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

        // Immobilien-Detailseiten: Immer nach 10 Sekunden öffnen
        if (isPropertyPage) {
          setTimeout(() => {
            if (window.voiceflow?.chat) {
              window.voiceflow.chat.open()
            }
          }, 10000)
        } else {
          // Alle anderen Seiten: Max 2x automatisch öffnen
          // 1. Mal nach 5 Sekunden, 2. Mal nach 15 Sekunden
          const openCount = parseInt(localStorage.getItem('chatOpenCount') || '0', 10)

          if (openCount < 1) {
            setTimeout(() => {
              if (window.voiceflow?.chat) {
                window.voiceflow.chat.open()
                localStorage.setItem('chatOpenCount', '1')
              }
            }, 5000)
          } else if (openCount < 2) {
            setTimeout(() => {
              if (window.voiceflow?.chat) {
                window.voiceflow.chat.open()
                localStorage.setItem('chatOpenCount', '2')
              }
            }, 15000)
          }
        }
      })
    }

    document.head.appendChild(script)

    // Cleanup on unmount or path change
    return () => {
      if (window.voiceflow?.chat?.destroy) {
        try {
          window.voiceflow.chat.destroy()
        } catch (e) {
          // Ignore errors
        }
      }
    }
  }, [pathname])

  // Reset chatOpenCount after 5 minutes (once)
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem('chatOpenCount')
    }, 300000)

    return () => clearTimeout(timer)
  }, [])

  return null
}
