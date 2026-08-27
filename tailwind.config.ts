import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f6f7d",
          dark: "#062f36",
          soft: "#dff4f2",
        },
        accent: {
          DEFAULT: "#d8a847",
          soft: "#fff2cf",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
