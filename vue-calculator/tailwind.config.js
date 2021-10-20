module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red-orange': '#fb5012',
        'blue-ncs': '#2e86ab',
        'ivory': '#f5f9e9',
        'cwu-red': '#ab0032'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
