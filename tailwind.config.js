const colors = require('tailwindcss/colors');
const bland = require('@ootiq/tailwind-blandcolors/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/renderer/**/*.tsx',
    './src/renderer/c2gin/colors.ts',
    './src/renderer/index.html',
  ],
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...bland,
      ...colors,
    },
    fontFamily: {
      sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
