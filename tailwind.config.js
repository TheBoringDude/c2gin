const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/renderer/**/*.tsx', './src/renderer/c2gin/colors.ts'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@ootiq/tailwind-blandcolors')],
};
