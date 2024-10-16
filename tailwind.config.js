/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container:{
      center:true,
      padding: '10px'
    },
    fontFamily:{
      'poppins' : ["Poppins", 'sans-serif'],
      'sevillana' : ["Sevillana", 'cursive']
    }
  },
  plugins: [],
}