import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wüstenrot Corporate Design Colors (Official Styleguide)
        wuestenrot: '#f84914',
        'wuestenrot-hover': '#c03700',
        'wuestenrot-light': '#fc7e51',
        wuestennacht: '#141414',
        'wuestennacht-hover': '#484848',
        'wuestennacht-light': '#333333',
        wohnraum: '#ffffff',
        warmgrau: '#eeeeee',
        wuestenwald: '#94c23c',
        'wuestenwald-hover': '#65882a',
        wuestenwein: '#a90064',
        'wuestenwein-hover': '#70003f',
        // Abstufungen wüstenrot
        'wuestenrot-80': '#f0aa00',
        'wuestenrot-60': '#d17d00',
        'wuestenrot-25': '#fde0d4',
        // Primary palette (based on wüstenrot)
        primary: {
          50: '#FFF7F5',
          100: '#FFEDE8',
          200: '#FFD4C7',
          300: '#FFB199',
          400: '#FF8A66',
          500: '#f84914',  // wüstenrot
          600: '#c03700',  // wüstenrot-hover
          700: '#B5320C',
          800: '#8F2709',
          900: '#6B1D07',
          950: '#4A1305',
        },
        // Secondary palette (based on wüstennacht)
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#141414',  // wüstennacht
          950: '#0a0a0a',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        // WW Type mit Fallbacks
        ww: ['"WW Type Bold"', '"WW Type Regular"', 'Arial Black', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'ww-regular': ['"WW Type Regular"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'ww-bold': ['"WW Type Bold"', 'Arial Black', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      borderRadius: {
        'haus': '0px',        // Eckig - Logo/Headlines
        'fenster': '16px',    // Boxen, Content
        'muenze': '50%',      // Icons, Störer
        'button': '24px',     // Pill-Buttons
        'input': '8px',       // Formularfelder (nur oben)
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1' }],
        'h1': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
        'h2': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
        'h3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'legal': ['0.75rem', { lineHeight: '1.4' }],
      },
      lineHeight: {
        'headline': '1.1',
        'headline-lg': '1.2',
        'body': '1.5',
        'copy': '1.4',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'wuestenrot': '0 0 30px rgba(248, 73, 20, 0.4)',
      },
      maxWidth: {
        'content': '1200px',
        'text': '720px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#141414', // wüstennacht
            h2: {
              color: '#141414',
              fontWeight: '700',
              textTransform: 'lowercase', // Styleguide: Kleinschreibung
            },
            h3: {
              color: '#141414',
              fontWeight: '600',
            },
            a: {
              color: '#f84914', // wüstenrot
              '&:hover': {
                color: '#c03700', // wüstenrot-hover
              },
            },
            strong: {
              color: '#141414',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
