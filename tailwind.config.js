/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        secondary: '#3f51b5',
        accent: '#ffc107',  // Changed the accent to a more subtle shade
        background: '#e0e0e0',
        surface: '#ffffff',
        textPrimary: '#212121',
        textSecondary: '#757575',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
