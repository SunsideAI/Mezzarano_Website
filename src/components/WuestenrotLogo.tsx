interface WuestenrotLogoProps {
  className?: string
  showText?: boolean
}

export default function WuestenrotLogo({ className = '', showText = true }: WuestenrotLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Wüstenrot W Logo */}
      <svg
        viewBox="0 0 153.5 44"
        className="h-11 w-auto"
        aria-label="Wüstenrot Immobilien Logo"
      >
        <g>
          <rect fill="#E30613" width="153.5" height="44" rx="4" />
          <g fill="#FFFFFF">
            {/* W Symbol */}
            <path d="M12 10h6l4 16 4-16h6l4 16 4-16h6l-7 24h-6l-4-14-4 14h-6z" />
            {/* Immobilien text */}
            <text x="52" y="28" fontSize="14" fontWeight="600" fontFamily="Arial, sans-serif">
              Immobilien
            </text>
          </g>
        </g>
      </svg>

      {showText && (
        <div className="hidden sm:block">
          <span className="block text-lg font-semibold text-secondary-900 leading-tight">wüstenrot</span>
          <span className="block text-xs text-secondary-500 tracking-wider uppercase">Immobilien</span>
        </div>
      )}
    </div>
  )
}

// Simplified inline logo for small spaces
export function WuestenrotLogoCompact({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={`h-10 w-10 ${className}`}
      aria-label="Wüstenrot Logo"
    >
      <rect fill="#E30613" width="44" height="44" rx="4" />
      <path
        fill="#FFFFFF"
        d="M8 12h5l3.5 14 3.5-14h5l3.5 14 3.5-14h5l-6 20h-5l-3.5-12-3.5 12h-5z"
      />
    </svg>
  )
}
