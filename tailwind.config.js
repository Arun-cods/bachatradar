/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        blinkit: '#F8CB46',
        zepto: '#E01E5A',
        instamart: '#FC8019',
        bigbasket: '#689F38',
        amazon: '#232F3E',
      }
    },
  },
  plugins: [],
}
