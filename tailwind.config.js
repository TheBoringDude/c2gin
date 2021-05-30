const colors = require('tailwindcss/colors');
const bland = require('@ootiq/tailwind-blandcolors/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/renderer/**/*.tsx', './src/renderer/c2gin/colors.ts'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...bland,
      ...colors,
    },
    fontFamily: {
      sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
