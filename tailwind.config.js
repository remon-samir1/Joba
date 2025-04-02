/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        textColor:"var(--text-color)",
      borderColor:"#ddd",
      inputColor:"#f6f8fc",
      },
    },
  },
  plugins: [],
};
