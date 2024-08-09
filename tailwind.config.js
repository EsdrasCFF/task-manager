/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        primary: "#00ADB5",
        darkBlue: "#35383E",
        lightBlue: "#E6F7F8",
        
      }
    },
  },
  plugins: [],
}

