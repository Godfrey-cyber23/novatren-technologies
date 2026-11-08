import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          navy: "#0A192F",
          deep: "#071326",
          electric: "#2563EB",
          cyan: "#22D3EE",
          white: "#F8FAFC",
          muted: "#9AAEC5",
          line: "#203650",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 36px rgb(34 211 238 / 18%)",
      },
    },
  },
  plugins: [],
};

export default config;