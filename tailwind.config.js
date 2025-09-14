/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // <-- FIX: double asterisk for subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
