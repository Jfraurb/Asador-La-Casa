import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marfil: { DEFAULT: "#F5F0E7", 50: "#FBF8F2", 100: "#F5F0E7", 200: "#EAE1D1", 300: "#DCCFB8" },
        granate: { DEFAULT: "#641F2A", 700: "#4F1821", 800: "#3C1219", 400: "#8A3A46" },
        botella: { DEFAULT: "#243C32", 700: "#1B2E26", 800: "#14231D", 400: "#3E5E50" },
        oro: { DEFAULT: "#C39B65", 600: "#A9814D", 700: "#76572C", 300: "#DCC197" },
        carbon: { DEFAULT: "#292621", 600: "#4A453D", 500: "#6A6358" },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        detail: ["var(--font-dmsans)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "76rem" },
      letterSpacing: { label: "0.22em" },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(18px)" }, "100%": { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .9s cubic-bezier(.2,.7,.2,1) both" },
    },
  },
  plugins: [],
};
export default config;
