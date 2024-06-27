import { addDynamicIconSelectors } from '@iconify/tailwind'

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#fafafa',
        'silver': '#cfc0bd',
        'battleship-gray': '#7f9183',
        'timberwolf-light': '#ddd5d0',
        'timberwolf-dark': '#706259',
        'feldgrau': '#586f6b',
        'ash-gray-100': '#FCFFF2',
        'ash-gray-200': '#FBFEEF',
        'ash-gray-300': '#F4F6E6',
        'ash-gray-400': '#E0E1D1',
        'ash-gray-500': '#b8b8aa',
        'ash-gray-600': '#939276',
        'ash-gray-700': '#6A6A5E',
        'ash-gray-800': '#47473B',
        'ash-gray-900': '#26261B',
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'system-ui', 'sans-serif'],
        'bungee-shade': ['"Bungee Shade"', 'sans-serif'],
        'amita': ["Amita", 'sans-serif'],
        'permanent-marker': ['"Permanent Marker"', 'sans-serif'],
        'bungee': ['Bungee', 'sans-serif'],
        'overlock': ['"Overlock SC"', 'sans-serif'],
        'overpass': ['"Overpass Mono"', 'Roboto', 'sans-serif'],
        'roboto-mono': ['"Roboto Mono"', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'hero-background': "url('src/assets/hero-bg.jpg')",
        'concoction-background': "url('src/assets/concoction.jpeg')",
        'paraphernalia-background': "url('src/assets/paraphernalia.jpeg')",
        'gradient-learn-more': "linear-gradient(to right, #586F6B, #252F2D 80%, #7CAAB5)",
        'gradient-action-button': "linear-gradient(to right, white, #B8B8AA)"
      },
      keyframes: {
        'slide': {
          '0%': { 
            transform: 'translateX(0)'

          },
          '90%': { 
            transform: 'translateX(5%)'
           }
        },
        fall: {
          '0%': { transform: 'translate(0%,-150%) skewX(0deg)' },
          '50%': { transform: 'translate(0%,0%) skewX(-10deg)' },
          '100%': { transform: 'translate(0%,150%) skewX(0deg)' },
        },
        fade: {
          '0%' : { opacity: 0},
          '100%' : { opacity: 1 }
        }
      },
      animation: {
        'slam': 'slide 3s cubic-bezier(0.3, -0.05, 0.8, -0.1) infinite',
        'fade': 'fade 1.2s ease-out 1'
      }
    },
  },
  plugins: [
    // Iconify plugins
    addDynamicIconSelectors(),
  ],
}