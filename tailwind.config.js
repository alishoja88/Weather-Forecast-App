/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        'sm': "15px"
      },
      width: {
        "90": "90%"
      },
      screens: {
        'sm': { "max": "649px" },
        "md": { "max": "768px" },
        // "lg": "1024px",
        // "xl": "1280px",
      }
    },
  },
  plugins: [],
}

