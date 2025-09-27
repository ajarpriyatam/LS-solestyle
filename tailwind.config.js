/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        background: "var(--color-background)",
        backgroundGray: "var(--color-backgroundGray)",
        textColor: "var(--color-text)",
      },
    },
  },
  plugins: [],
};
