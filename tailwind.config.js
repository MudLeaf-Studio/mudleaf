/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C4622D',
          light: '#D4784A',
          pale: '#F2E4D8',
        },
        dark: {
          DEFAULT: '#2C1810',
          mid: '#4A2E20',
        },
        warm: {
          white: '#FAF7F4',
          cream: '#F5EDE3',
        },
        sage: {
          DEFAULT: '#7A9E7E',
          light: '#EAF2EB',
        },
        mudleaf: {
          text: '#2C2418',
          'text-mid': '#6B5744',
          'text-light': '#9B8676',
          border: '#E2D5C8',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(48px, 6vw, 80px)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(40px, 5vw, 68px)', { lineHeight: '1.1' }],
        'display-md': ['clamp(32px, 4vw, 52px)', { lineHeight: '1.15' }],
        'display-sm': ['clamp(24px, 3vw, 36px)', { lineHeight: '1.2' }],
      },
      spacing: {
        section: '96px',
        'section-sm': '56px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
