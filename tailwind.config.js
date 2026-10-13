/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#05070B',
        midnight: '#0A1020',
        deepblue: '#101D35',
        cyan: {
          electric: '#45D8FF',
          DEFAULT: '#45D8FF',
          dark: '#0284c7'
        },
        indigo: {
          vibrant: '#7167FF',
          DEFAULT: '#7167FF',
          dark: '#4f46e5'
        },
        snow: '#F5F7FA',
        mutedgrey: '#9BA7B7',
        // Semantic aliases
        background: '#05070B',
        'background-secondary': '#0A1020',
        'card-bg': '#0E172B',
        'card-border': '#1E2D4A',
        'accent-primary': '#45D8FF',
        'accent-secondary': '#7167FF',
        'accent-highlight': '#FED200',
        'accent-danger': '#F43F5E',
        'text-main': '#F5F7FA',
        'text-muted': '#9BA7B7',
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'mega-wide': '0.4em',
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at 50% 50%, transparent 40%, #05070B 95%)',
        'subtle-grid': 'linear-gradient(to right, rgba(69, 216, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(69, 216, 255, 0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
