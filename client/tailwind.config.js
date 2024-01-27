/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#ebe9fc',
        'background': '#010104',
        'primary': '#3a31d8',
        'secondary': '#020024',
        'accent': '#0600c2',
        'negative': '#D83A31'
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

