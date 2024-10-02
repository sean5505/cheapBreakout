/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        'ex-sm': '500px',
      },
      width: {
        '146' : '36rem', // 576 px
      },
      height: {
        '144' : '35rem', // 560 px

      },
      fontSize: {
        'xxs' : '.4rem'
      }
      
    },
  },
  plugins: [],
}