/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1025px' },
      // => @media (max-width: 1023px) { ... }
      'tall': { 'raw': '(max-width: 872px)' },

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
      'mdsm': { 'raw': '(max-width: 576px)' },

      'ssm': { 'raw': '(max-width: 450px)' },

      'xsm': { 'raw': '(max-width: 375px)' },
    }
  },
  plugins: [],
}

