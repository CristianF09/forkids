/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // blue-800
          light: '#3B82F6', // blue-500
        },
        secondary: {
          DEFAULT: '#2563EB', // blue-600
          light: '#60A5FA', // blue-400
        },
        accent: {
          DEFAULT: '#1D4ED8', // blue-700
          light: '#93C5FD', // blue-300
        }
      }
    },
  },
  plugins: [],
} 