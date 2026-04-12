import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        primary: {
          DEFAULT: "#00D4AA",
          50: "#e6faf5",
          100: "#b3f0e0",
          200: "#80e6cc",
          300: "#4ddcb7",
          400: "#1ad2a3",
          500: "#00D4AA",
          600: "#00a888",
          700: "#007d66",
          800: "#005244",
          900: "#002922",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          50: "#f3eefe",
          100: "#ddd0fc",
          200: "#c7b2fa",
          300: "#b194f8",
          400: "#9b76f6",
          500: "#8B5CF6",
          600: "#6d3ad4",
          700: "#5228a8",
          800: "#37197c",
          900: "#1c0d50",
        },
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        clash: ["var(--font-syne)", "sans-serif"],
        "general-sans": ["var(--font-dm-sans)", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        stagger: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-down": "slide-down 0.8s ease-out forwards",
        stagger: "stagger 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
