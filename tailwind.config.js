/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // Enable dark mode and use 'class' strategy for better control
  darkMode: 'class', 

  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }), // Ensure compatibility with custom scrollbars
  ],
}
