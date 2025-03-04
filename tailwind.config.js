import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        18: "1.125rem",
        25: "1.5625rem",
        35: "2.1875rem",
        40: "2.5rem",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        loading: "loading 1.5s infinite",
      },
      transitionDuration: {
        '1000': '1000ms',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
