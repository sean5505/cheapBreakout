/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      screens: {
        'ex-sm': '468px',
      },
      width: {
        '560' : '560px'
      },
      height: {
        '550' : '550px'

      }
    },
  },
  plugins: [],
}

