const { colors } = require("@mui/material");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "theme-red": "#f87171",
      },
    },
  },
  plugins: [],
};
