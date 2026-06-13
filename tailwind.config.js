/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1E1E1E',
        'bg-deep': '#161616',
        surface: '#252525',
        'surface-2': '#2c2c2a',
        cream: '#E8E8C6',
        orange: '#FF6B35',
        muted: '#888880',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee-scroll 28s linear infinite',
        'marquee-404': 'marquee-scroll 26s linear infinite',
        flicker: 'flicker 6s infinite steps(1)',
        blink: 'blink 1.4s steps(1) infinite',
        neonflick: 'neonflick 4.5s infinite steps(1)',
        'glitch-top': 'gl1 2.6s infinite steps(2)',
        'glitch-bot': 'gl2 3.1s infinite steps(2)',
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        gl1: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%':     { transform: 'translate(-4px,-2px)' },
          '40%':     { transform: 'translate(3px,1px)' },
        },
        gl2: {
          '0%,100%': { transform: 'translate(0,0)' },
          '25%':     { transform: 'translate(4px,2px)' },
          '55%':     { transform: 'translate(-3px,-1px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '8%': { opacity: '0.86' },
          '8.5%': { opacity: '1' },
          '20%': { opacity: '1' },
          '20.4%': { opacity: '0.7' },
          '20.8%': { opacity: '1' },
          '52%': { opacity: '1' },
          '52.3%': { opacity: '0.92' },
          '52.6%': { opacity: '1' },
          '70%': { opacity: '1' },
          '70.5%': { opacity: '0.6' },
          '71%': { opacity: '1' },
        },
        blink: {
          '0%, 60%': { opacity: '1' },
          '61%, 100%': { opacity: '0' },
        },
        neonflick: {
          '0%, 100%': { opacity: '1' },
          '43%': { opacity: '1' },
          '44%': { opacity: '0.35' },
          '45%': { opacity: '1' },
          '88%': { opacity: '1' },
          '88.6%': { opacity: '0.4' },
          '89%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
