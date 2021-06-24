module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#D87D4A',
          second: '#fbaf85',
        },
        grey: {
          DEFAULT: '#F1F1F1',
          two: '#FAFAFA',
          shop: '#6E6E6E',
          border: '#cfcfcf',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
