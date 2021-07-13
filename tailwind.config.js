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
        cart: 'calc(100vh - 123px)',
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
        translucent: 'rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: (theme) => ({
        hero: "url('/home/desktop/image-hero.jpg')",
        'hero-mobile':
          "linear-gradient(114deg, rgba(0,0,0,0.700717787114846) 0%, rgba(0,0,0,0.6951155462184874) 100%), url('/home/desktop/image-hero.jpg')",
        circle: "url('/home/desktop/pattern-circles.svg')",
        'circle-mobile': "url('/home/desktop/pattern-circles.svg')",
        'circle-tablet': "url('/home/desktop/pattern-circles.svg')",
        speaker: "url('/home/desktop/image-speaker-zx7.jpg')",
        'speaker-mobile': "url('/home/mobile/image-speaker-zx7.jpg')",
        'speaker-tablet': "url('/home/tablet/image-speaker-zx7.jpg')",
        earphone: "url('/home/desktop/image-earphones-yx1.jpg')",
        'earphone-tablet': "url('/home/tablet/image-earphones-yx1.jpg')",
        'earphone-mobile': "url('/home/mobile/image-earphones-yx1.jpg')",
        about: "url('/shared/desktop/image-best-gear.jpg')",
        'about-tablet': "url('/shared/tablet/image-best-gear.jpg')",
        'about-mobile': "url('/shared/mobile/image-best-gear.jpg')",
      }),
      backgroundSize: {
        mobile: '1500px',
        circle: '950px',
        'circle-mobile': '450px',
        'circle-tablet': '450px',
      },
      backgroundPosition: {
        mobile: '73% bottom',
        tablet: '82% bottom',
        circle: '-65% 10%',
        'circle-mobile': 'center -56%',
        'circle-tablet': 'center -56%',
      },
      gridTemplateColumns: {
        gallery: '39% 58%',
        'gallery-tablet': '277px  407px',
      },
      gridTemplateRows: {
        gallery: '280px 280px',
        'gallery-tablet': '174px 174px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
