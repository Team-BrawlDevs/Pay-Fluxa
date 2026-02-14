/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B8DEF",
        secondary: "#7C3AED",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        darkbg: "#0F172A"
      }
    }
  },
  plugins: []
};
