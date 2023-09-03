/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      caro: {
        300: '#FEDDFF',
        400: '#FFCAC2',
        800: '#FE9E8E',
      },
      lavender: {
        400: '#F1D8FF',
        800: '#C7B3FF',
      },
      tifany_blue: {
        100: '#ECFCFB',
        200: '#FDEFFF',
        300: '#EAFFFF',
        400: '#DBFBF1',
        800: '#81F0D4',
      },
      pinky: {
        200: '#F0D1F1',
        300: '#AE4BB1',
        400: '#E2A4E4',        
        600: '#F700FF',
        700: '#97119C'
      },
      honey: {
        400: '#FFC862',
      },
      rurikon: {
        300: '#5C667C',
        400: '#1D2B49',
        800: '#121212',
      },
      grey: {
        100: '#FAFAFA',
        200: '#E9E9E9',
        300: '#C4C4C4',
        400: '#828B98',
        500: '#1E1E1E',
        600: '#092447',
        700: '#4F5B6B',
        800: '#051831'
      },
      tulip: {
        300: '#C6F6F5'
      }
    },
    boxShadow: {
      input:
        '-3.68131px -8.83515px 11.7802px #FFFFFF, 3.68131px 8.83515px 11.7802px rgba(158, 158, 158, 0.25)',
      'toggle-circle': '0.736262px 0.736262px 2.20879px rgba(0, 0, 0, 0.25)',
      'input2': '-3.68131px -8.83515px 11.7802px #1D2B49, 3.68131px 8.83515px 11.7802px rgba(158, 158, 158, 0.05)',
      'inset-1': 'inset -1.47252px -1.47252px 2.20879px #E9E9E9, inset 2.20879px 2.20879px 2.20879px rgba(158, 158, 158, 0.25)',
      'none': 'none'
    }
  },
  plugins: [
    require('postcss-import'),
    require('@tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('flowbite/plugin'),
  ],
};
