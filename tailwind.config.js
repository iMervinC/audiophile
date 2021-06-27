module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      height: {
        mobilenav: 'calc(100vh - 106px)',
      },
      colors: {
        main: {
          DEFAULT: '#D87D4A',
          second: '#fbaf85',
          text50: '#898989',
          text75: '#C4C4C4',
        },
        grey: {
          DEFAULT: '#F1F1F1',
          two: '#FAFAFA',
          shop: '#6E6E6E',
          border: '#cfcfcf',
        },
      },
      backgroundImage: (theme) => ({
        hero: "url('/home/desktop/image-hero.jpg')",
        'hero-mobile':
          "linear-gradient(114deg, rgba(0,0,0,0.700717787114846) 0%, rgba(0,0,0,0.6951155462184874) 100%), url('/home/desktop/image-hero.jpg')",
      }),
      backgroundSize: {
        mobile: '1500px',
      },
      backgroundPosition: {
        mobile: '73% bottom',
        tablet: '82% bottom',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
