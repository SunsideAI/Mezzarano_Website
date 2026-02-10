'use client'

import { useEffect } from 'react'

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
      }
    }
  }
}

export default function VoiceflowChat() {
  useEffect(() => {
    // Check if already loaded
    if (document.getElementById('voiceflow-widget')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'voiceflow-widget'
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs'
    script.type = 'text/javascript'

    script.onload = () => {
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
        const currentUrl = window.location.href
        const siteBase = 'https://mezzarano-immobilien.de'
        const isHomePage = currentUrl === siteBase || currentUrl === siteBase + '/'
        const isPropertyPage = currentUrl.includes('/immobilie/')

        // Proaktive Nachricht je nach Seitenart
        setTimeout(() => {
          window.voiceflow.chat.proactive.clear()
          if (isPropertyPage) {
            window.voiceflow.chat.proactive.push({
              type: 'text',
              payload: {
                message: 'Diese Immobilie könnte Ihr neues Zuhause sein! Ich beantworte alle Fragen und sende Ihnen alle Details – starten Sie jetzt! 😊🏡'
              }
            })
          } else {
            window.voiceflow.chat.proactive.push({
              type: 'text',
              payload: {
                message: 'Ich bin Ihre intelligente Assistentin Sophia! Immobilien kaufen, verkaufen oder bewerten? Ich helfe Ihnen sofort – starten Sie jetzt! 😊🏡'
              }
            })
          }
        }, 1000)

        // Chat-Öffnungszähler aus localStorage abrufen
        let openCount = parseInt(localStorage.getItem('chatOpenCount') || '0', 10)

        if (openCount < 1) {
          // Erstes Öffnen nach 5 Sekunden
          setTimeout(() => {
            window.voiceflow.chat.open()
            localStorage.setItem('chatOpenCount', String(openCount + 1))
          }, 5000)
        } else if (openCount < 2) {
          // Zweites Öffnen nach 12 Sekunden
          setTimeout(() => {
            window.voiceflow.chat.open()
            localStorage.setItem('chatOpenCount', String(openCount + 1))
          }, 12000)
        }

        // chatOpenCount nach 5 Minuten zurücksetzen
        setInterval(() => {
          localStorage.removeItem('chatOpenCount')
        }, 300000) // 300000 Millisekunden = 5 Minuten
      })
    }

    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }

    return () => {
      // Cleanup on unmount
      const widgetScript = document.getElementById('voiceflow-widget')
      if (widgetScript) {
        widgetScript.remove()
      }
    }
  }, [])

  return null
}
