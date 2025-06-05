// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // app directory
    "./components/**/*.{js,ts,jsx,tsx}", // ton dossier composants
    "./pages/**/*.{js,ts,jsx,tsx}",      // si jamais tu l’utilises aussi
  ],
  theme: {
    extend: {},
  },
  safelist: ['slide-in'], //  force Tailwind à garder ta classe
  plugins: {
    '@tailwindcss/postcss': {},
  },

}
