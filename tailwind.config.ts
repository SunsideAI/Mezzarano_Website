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
        // Wüstenrot Brand Colors (Official)
        wuestenrot: {
          orange: '#F84914',
          'orange-dark': '#D93D0F',
          'orange-light': '#FF5C2A',
        },
        primary: {
          50: '#FFF7F5',
          100: '#FFEDE8',
          200: '#FFD4C7',
          300: '#FFB199',
          400: '#FF8A66',
          500: '#F84914',  // Wüstenrot Orange
          600: '#D93D0F',
          700: '#B5320C',
          800: '#8F2709',
          900: '#6B1D07',
          950: '#4A1305',
        },
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
          900: '#0F172A',
          950: '#020617',
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
        sans: ['Helvetica', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            h2: {
              color: '#0F172A',
              fontWeight: '700',
            },
            h3: {
              color: '#1E293B',
              fontWeight: '600',
            },
            a: {
              color: '#F84914',
              '&:hover': {
                color: '#D93D0F',
              },
            },
            strong: {
              color: '#0F172A',
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
