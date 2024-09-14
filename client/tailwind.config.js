/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark
        "Very-Dark-Blue": "hsl(230, 17%, 14%)",
        "Very-Dark-Blue-Top": "hsl(232, 19%, 15%)",
        "Dark-Desaturated-Blue": "hsl(228, 28%, 20%)",
        "Desaturated-Blue": "hsl(228, 34%, 66%)",
        "White": "hsl(0, 0%, 100%)",
        // light
        "Very-Pale-Blue": "hsl(225, 100%, 98%)",
        "Light-Grayish-Blue": "hsl(227, 47%, 96%)",
        "Dark-Grayish-Blue": "hsl(228, 12%, 44%)",
        "Very-Dark-Blue": "hsl(230, 17%, 14%)",
      },
      screens: {
        'desktop': '900px',
        'tablet': { 'min': '450px', 'max': '900px'},
        'mobile': { 'min':'0px', 'max': '449px'}
      },
    },
  },
  plugins: [],
}

