/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0046c0',
      },
      zIndex: {
        '1000': '1000',
      }
    },
  },
  plugins: [],
} 