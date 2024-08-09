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
        darkGray: "#818181",
        textGray: "#9A9C9F",
        lightGray: "#F4F4F5"
      }
    },
  },
  plugins: [],
}

