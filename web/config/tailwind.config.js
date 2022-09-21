/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Archivo', 'sans-serif'],
      display: ['Chicle', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.9rem', '1rem'],
      sm: ['1.2rem', '1.3rem'],
      base: ['1.6rem', '2rem'],
      lg: ['2.2rem', '2.4rem'],
      xl: ['2.8rem', '3.3rem'],
      '2xl': ['3.6rem', '4.3rem'],
      '3xl': ['4.8rem', '5.8rem'],
    },
    extend: {
      screens: {
        betterhover: { raw: '(hover: hover)' },
      },
      colors: {
        background: {
          light: '#F6F6F6',
          dark: '#312e81',
        },
        transparent: 'rgba(0,0,0,0)',
        'light-gray': '#E6E8E9',
        'dark-gray': '#ADB3B6',
        white: '#FDFDFD',
        black: '#211F1F',
        text: {
          default: '#433E3E',
          subtle: '#7E7E73',
        },
        brand: {
          primary: {
            50: '#ECF6F8',
            100: '#D9EEF2',
            200: '#B3DDE5',
            300: '#8DCBD8',
            400: '#63B9CA',
            500: '#40A6BB',
            600: '#338494',
            700: '#276572',
            800: '#1A444C',
            900: '#0D2226',
          },
          secondary: {
            50: '#F6DFD0',
            100: '#F2D4BF',
            200: '#EBBD9E',
            300: '#E1A37A',
            400: '#D88C5A',
            500: '#CD753B',
            600: '#B1602A',
            700: '#924E21',
            800: '#723C18',
            900: '#4D280F',
          },
        },
      },
      keyframes: {
        'text-wiggle': {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
      },
      animation: {
        'text-wiggle': 'text-wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
