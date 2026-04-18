import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05070A",
          900: "#0A0D12",
          800: "#0F141B",
          700: "#171D26",
          600: "#232B37",
          500: "#2E3744",
        },
        accent: {
          DEFAULT: "#7DD3FC",
          bright: "#38BDF8",
          deep: "#0EA5E9",
        },
        // Heritage teal from the 1999 FLG logo — used as a secondary accent
        // in gradients, glows, and subtle accent moments.
        teal: {
          DEFAULT: "#2EB9A8",
          bright: "#5ED4C3",
          deep: "#0D7D7A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-expo": "cubic-bezier(0.77, 0, 0.175, 1)",
        "drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      animation: {
        "grid-fade": "gridFade 8s ease-in-out infinite",
        "ping-slow": "pingSlow 3s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
      },
      keyframes: {
        gridFade: {
          "0%,100%": { opacity: "0.15" },
          "50%": { opacity: "0.35" },
        },
        pingSlow: {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
