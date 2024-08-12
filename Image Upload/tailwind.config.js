/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary':{
          100:'#FFFFFF',
          200:'#A9ACB4',
        },
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
          300: '#292D32',
          400: '#EEF1F7',
        }
      },

      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}