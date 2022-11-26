/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{html,tsx}", "./pages/**/*.{html,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "400px",
    },
  },
  plugins: [],
  important: true,
};
