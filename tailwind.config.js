/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#121214',
        'bg-deep': '#0A0A0B',
        surface: '#19191B',
        'surface-2': '#202023',
        cream: '#F4F1E8',
        gold: '#C6A455',
        muted: '#96928A',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee-scroll 28s linear infinite',
        'marquee-404': 'marquee-scroll 26s linear infinite',
        blink: 'blink 1.4s steps(1) infinite',
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 60%': { opacity: '1' },
          '61%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
