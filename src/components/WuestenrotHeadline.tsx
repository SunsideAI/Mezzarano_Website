'use client'

import Image from 'next/image'

interface HeadlineLine {
  text: string
  isHighlighted?: boolean // If true, uses wüstenrot color
}

interface WuestenrotHeadlineProps {
  /** Small label/tag above the headline (e.g., "Immobilie verkaufen") */
  tagline?: string
  /** Array of headline lines - each gets its own white bar */
  lines: HeadlineLine[]
  /** Show the wüstenrot brand at the end */
  showBrand?: boolean
  /** Optional subheadline below the main headline */
  subheadline?: string
  /** Size variant */
  size?: 'default' | 'large' | 'small'
  /** Alignment */
  align?: 'left' | 'center'
  /** Animation delays */
  animated?: boolean
}

/**
 * WuestenrotHeadline - Headlines mit weißen Balken nach Wüstenrot Layout-Prinzipien
 *
 * Basierend auf dem Wüstenrot Corporate Design:
 * - Weiße Balken hinter dem Text
 * - Kleinschreibung für Headlines
 * - wüstenrot Akzentfarbe für hervorgehobene Zeilen
 * - Brand "wüstenrot" am Ende
 */
export default function WuestenrotHeadline({
  tagline,
  lines,
  showBrand = true,
  subheadline,
  size = 'default',
  align = 'left',
  animated = true,
}: WuestenrotHeadlineProps) {
  const sizeClasses = {
    small: {
      tagline: 'text-xs px-2 py-0.5',
      headline: 'text-2xl md:text-3xl',
      brand: 'h-6 md:h-8',
      gap: 'gap-1',
    },
    default: {
      tagline: 'text-sm px-3 py-1',
      headline: 'text-3xl md:text-4xl lg:text-5xl',
      brand: 'h-8 md:h-10',
      gap: 'gap-2',
    },
    large: {
      tagline: 'text-sm md:text-base px-4 py-1.5',
      headline: 'text-4xl md:text-5xl lg:text-6xl',
      brand: 'h-10 md:h-12',
      gap: 'gap-2 md:gap-3',
    },
  }

  const alignClasses = {
    left: 'items-start',
    center: 'items-center',
  }

  const currentSize = sizeClasses[size]
  const currentAlign = alignClasses[align]

  return (
    <div className={`flex flex-col ${currentAlign} ${currentSize.gap}`}>
      {/* Tagline */}
      {tagline && (
        <div
          className={`inline-block bg-wuestenrot text-white font-bold ${currentSize.tagline} mb-2 ${
            animated ? 'animate-fade-in' : ''
          }`}
          style={{ animationDelay: animated ? '0ms' : undefined }}
        >
          {tagline}
        </div>
      )}

      {/* Headline Lines with White Bars */}
      <div className={`flex flex-col ${currentAlign} ${currentSize.gap}`}>
        {lines.map((line, index) => (
          <span
            key={index}
            className={`inline-block bg-white px-3 md:px-4 py-1 ${currentSize.headline} font-bold leading-tight lowercase ${
              line.isHighlighted ? 'text-wuestenrot' : 'text-wuestennacht'
            } ${animated ? 'animate-fade-in' : ''}`}
            style={{ animationDelay: animated ? `${(index + 1) * 100}ms` : undefined }}
          >
            {line.text}
          </span>
        ))}

        {/* Brand wüstenrot */}
        {showBrand && (
          <span
            className={`inline-flex items-center bg-white px-3 md:px-4 py-1 ${currentSize.headline} font-bold leading-tight text-wuestenrot ${
              animated ? 'animate-fade-in' : ''
            }`}
            style={{ animationDelay: animated ? `${(lines.length + 1) * 100}ms` : undefined }}
          >
            wüstenrot
          </span>
        )}
      </div>

      {/* Subheadline */}
      {subheadline && (
        <p
          className={`mt-4 md:mt-6 text-lg md:text-xl text-white/90 max-w-2xl ${
            align === 'center' ? 'text-center' : ''
          } ${animated ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: animated ? `${(lines.length + 2) * 100}ms` : undefined }}
        >
          {subheadline}
        </p>
      )}
    </div>
  )
}

/**
 * WuestenrotHeadlineLight - Für helle Hintergründe
 * Verwendet wüstenrot-25 (helles Rosa) als Balkenfarbe
 */
export function WuestenrotHeadlineLight({
  tagline,
  lines,
  showBrand = true,
  subheadline,
  size = 'default',
  align = 'left',
  animated = true,
}: WuestenrotHeadlineProps) {
  const sizeClasses = {
    small: {
      tagline: 'text-xs px-2 py-0.5',
      headline: 'text-2xl md:text-3xl',
      gap: 'gap-1',
    },
    default: {
      tagline: 'text-sm px-3 py-1',
      headline: 'text-3xl md:text-4xl lg:text-5xl',
      gap: 'gap-2',
    },
    large: {
      tagline: 'text-sm md:text-base px-4 py-1.5',
      headline: 'text-4xl md:text-5xl lg:text-6xl',
      gap: 'gap-2 md:gap-3',
    },
  }

  const alignClasses = {
    left: 'items-start',
    center: 'items-center',
  }

  const currentSize = sizeClasses[size]
  const currentAlign = alignClasses[align]

  return (
    <div className={`flex flex-col ${currentAlign} ${currentSize.gap}`}>
      {/* Tagline */}
      {tagline && (
        <div
          className={`inline-block bg-wuestenrot text-white font-bold ${currentSize.tagline} mb-2 ${
            animated ? 'animate-fade-in' : ''
          }`}
        >
          {tagline}
        </div>
      )}

      {/* Headline Lines */}
      <div className={`flex flex-col ${currentAlign} ${currentSize.gap}`}>
        {lines.map((line, index) => (
          <span
            key={index}
            className={`inline-block bg-wuestenrot-25 px-3 md:px-4 py-1 ${currentSize.headline} font-bold leading-tight lowercase ${
              line.isHighlighted ? 'text-wuestenrot' : 'text-wuestennacht'
            } ${animated ? 'animate-fade-in' : ''}`}
            style={{ animationDelay: animated ? `${(index + 1) * 100}ms` : undefined }}
          >
            {line.text}
          </span>
        ))}

        {/* Brand wüstenrot */}
        {showBrand && (
          <span
            className={`inline-block bg-wuestenrot-25 px-3 md:px-4 py-1 ${currentSize.headline} font-bold leading-tight text-wuestenrot ${
              animated ? 'animate-fade-in' : ''
            }`}
            style={{ animationDelay: animated ? `${(lines.length + 1) * 100}ms` : undefined }}
          >
            wüstenrot
          </span>
        )}
      </div>

      {/* Subheadline */}
      {subheadline && (
        <p
          className={`mt-4 md:mt-6 text-lg md:text-xl text-wuestennacht-light max-w-2xl ${
            align === 'center' ? 'text-center' : ''
          } ${animated ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: animated ? `${(lines.length + 2) * 100}ms` : undefined }}
        >
          {subheadline}
        </p>
      )}
    </div>
  )
}
