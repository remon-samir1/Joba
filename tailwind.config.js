/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: '#F15A24',
        textColor:"var(--text-color)",
        text2:'#656565',
      borderColor:"#ddd",
      inputColor:"#f6f8fc",
      btnColor:"#02308E",
      },
    },
  },
  plugins: [],
};
