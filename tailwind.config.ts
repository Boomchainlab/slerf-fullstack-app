import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        slerf: {
          gold: "#FFD700",
          darkGold: "#B8860B",
          lightGold: "#FFFF99",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        "coin-flip": "coin-flip 0.6s ease-in-out",
        "coin-collect": "coin-collect 0.8s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)",
          },
        },
        "coin-flip": {
          "0%": { transform: "rotateY(0deg) scale(1)" },
          "50%": { transform: "rotateY(180deg) scale(1.1)" },
          "100%": { transform: "rotateY(360deg) scale(1)" },
        },
        "coin-collect": {
          "0%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.2) translateY(-20px)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(0.8) translateY(-40px)",
            opacity: "0",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
