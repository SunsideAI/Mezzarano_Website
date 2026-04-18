import Link from 'next/link'
import Image from 'next/image'
import { Phone, ArrowRight, LucideIcon } from 'lucide-react'

const BLUR_DATA_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMxYTIzMmUiLz48L3N2Zz4="

interface HeadlineLine {
  text: string
  isHighlighted?: boolean
}

interface PageHeroProps {
  /** Small tagline above the headline */
  tagline: string
  /** Icon for the tagline */
  icon?: LucideIcon
  /** Array of headline lines - each gets its own white bar */
  lines: HeadlineLine[]
  /** Show the wüstenrot brand at the end */
  showBrand?: boolean
  /** Subheadline text */
  subheadline: string
  /** Primary CTA button text */
  primaryCta?: {
    text: string
    href: string
  }
  /** Secondary CTA button (phone) */
  showPhoneCta?: boolean
  /** Optional background image */
  backgroundImage?: string
}

/**
 * PageHero - Hero section for sub-pages with Wüstenrot Layout-Prinzipien
 *
 * Features:
 * - White bars behind headline text
 * - Lowercase headlines (Wüstenrot style)
 * - Brand "wüstenrot" at the end
 * - Dark background with gradient
 */
export default function PageHero({
  tagline,
  icon: Icon,
  lines,
  showBrand = true,
  subheadline,
  primaryCta,
  showPhoneCta = true,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section
      className="relative min-h-[auto] py-16 md:py-0 md:min-h-[560px] bg-wuestennacht flex items-center overflow-hidden"
    >
      {/* Background Image (optional) - optimized with Next.js Image */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wuestennacht/95 via-wuestennacht/85 to-wuestennacht/70" />
        </>
      )}

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          {/* Tagline - Icon + Text in wuestenrot */}
          <div
            className="flex items-center gap-2 text-wuestenrot mb-6"
            data-aos="fade-up"
          >
            {Icon && <Icon className="h-5 w-5" />}
            <span className="text-sm font-semibold uppercase tracking-wider">
              {tagline}
            </span>
          </div>

          {/* Headline with White Bars - keine Abstände zwischen Balken */}
          <h1 className="mb-8" data-aos="fade-up" data-aos-delay="100">
            <span className="flex flex-col items-start gap-0">
              {lines.map((line, index) => (
                <span
                  key={index}
                  className={`inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-none lowercase ${
                    line.isHighlighted ? 'text-wuestenrot' : 'text-wuestennacht'
                  }`}
                >
                  {line.text}
                </span>
              ))}
              {/* Brand wüstenrot */}
              {showBrand && (
                <span className="inline-block w-fit whitespace-nowrap bg-white px-4 py-1 md:px-5 md:py-2 text-3xl md:text-5xl lg:text-6xl font-bold leading-none text-wuestenrot">
                  wüstenrot
                </span>
              )}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {subheadline}
          </p>

          {/* CTA Buttons */}
          {(primaryCta || showPhoneCta) && (
            <div
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-primary">
                  {primaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
              {showPhoneCta && (
                <a
                  href="tel:01776542977"
                  className="btn-outline border-white text-white hover:bg-white hover:text-wuestennacht"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  0177 6542977
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
