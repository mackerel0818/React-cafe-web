/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#8c4420",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class",
};
