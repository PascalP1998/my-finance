/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e4e7ec',
        'background': '#313338',
        'primary': '#c9f66f',
        'secondary': '#4b415d',
        'accent': '#9b82a8',
        'negative': '#f6856f'
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        work_sans: 'Work Sans'
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      }
    },
  },
  plugins: [],
}

