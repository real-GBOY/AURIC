/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        bg: '#121214',
        'bg-deep': '#0A0A0B',
        surface: '#19191B',
        'surface-2': '#202023',
        cream: '#F4F1E8',
        sand: '#D9D4C7',
        gold: '#DCA733',
        'gold-hi': '#E6B545',
        'gold-deep': '#7A5A12',
        muted: '#96928A',
        copy: '#B3AFA6',
        dim: '#8A867E', // 5.2:1 on the page background (was #6F6B64, 3.5:1)
        charcoal: '#3A3A3F',
        whatsapp: '#25D366',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        display: ['Unbounded', 'sans-serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee-scroll 32s linear infinite',
        'spin-slow': 'spin 22s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
