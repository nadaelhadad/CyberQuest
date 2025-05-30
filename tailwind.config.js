/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#121212',
        'cyber-dark': '#1a1a2e',
        'cyber-gray': '#262640',
        'cyber-pink': {
          100: '#ff6ad5',
          200: '#ff00c1',
          300: '#c800ff',
        },
        'cyber-blue': {
          100: '#00fff9',
          200: '#00aff5',
          300: '#0078ff',
        },
        'cyber-green': {
          100: '#00ffc8',
          200: '#00ff66',
          300: '#39ff14',
        },
        'cyber-yellow': '#fcee0c',
        'cyber-orange': '#ff5500',
        'cyber-red': '#ff073a',
      },
      fontFamily: {
        cyber: ['Orbitron', 'sans-serif'],
        terminal: ['JetBrains Mono', 'monospace'],
        future: ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 5px #ff00c1, 0 0 10px #ff00c1, 0 0 15px #ff00c1',
        'neon-blue': '0 0 5px #00aff5, 0 0 10px #00aff5, 0 0 15px #00aff5',
        'neon-green': '0 0 5px #00ff66, 0 0 10px #00ff66, 0 0 15px #00ff66',
        'neon-yellow': '0 0 5px #fcee0c, 0 0 10px #fcee0c, 0 0 15px #fcee0c',
        'neon-orange': '0 0 5px #ff5500, 0 0 10px #ff5500, 0 0 15px #ff5500',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 3s linear infinite',
        'glitch': 'glitch 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'brightness(100%)' },
          '100%': { filter: 'brightness(130%)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 0.99 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.4 },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '33%': { transform: 'translate(-5px, 2px)' },
          '66%': { transform: 'translate(5px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};