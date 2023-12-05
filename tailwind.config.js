const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    screens: {
      '2xs': '360px',
      xs: '460px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
