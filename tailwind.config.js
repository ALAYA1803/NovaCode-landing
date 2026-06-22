/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        nc: {
          bg:        '#070d1a',
          'bg-2':    '#0b1221',
          card:      '#0f1929',
          'card-h':  '#131f33',
          border:    '#1a2744',
          'border-l':'#1e3054',
          accent:    '#22d3ee',
          'accent-d':'#0e7490',
          text:      '#f0f6ff',
          'text-2':  '#8ba3c4',
          muted:     '#4d6580',
        },
      },
    },
  },
  plugins: [],
}

