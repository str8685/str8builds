import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // STR8 BUILD custom colors
        electric: {
          DEFAULT: "hsl(var(--electric-blue))",
          50: "hsl(var(--electric-blue) / 0.5)",
          70: "hsl(var(--electric-blue) / 0.7)",
        },
        cyan: {
          DEFAULT: "hsl(var(--vibrant-cyan))",
          50: "hsl(var(--vibrant-cyan) / 0.5)",
          70: "hsl(var(--vibrant-cyan) / 0.7)",
        },
        teal: {
          DEFAULT: "hsl(var(--energy-teal))",
          50: "hsl(var(--energy-teal) / 0.5)",
          70: "hsl(var(--energy-teal) / 0.7)",
        },
        space: {
          DEFAULT: "hsl(var(--space-blue-900))",
          700: "hsl(var(--space-blue-700))",
          800: "hsl(var(--space-blue-800))",
          900: "hsl(var(--space-blue-900))",
        },
        purple: {
          800: "hsl(var(--space-purple-800))",
          900: "hsl(var(--space-purple-900))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fadeIn": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "glitch-1": {
          "0%": { transform: "translate(0)" },
          "10%": { transform: "translate(-5px, 0)" },
          "20%": { transform: "translate(-5px, 5px)" },
          "30%": { transform: "translate(5px, -5px)" },
          "40%": { transform: "translate(-5px, 5px)" },
          "50%": { transform: "translate(5px, -5px)" },
          "60%": { transform: "translate(5px, 5px)" },
          "70%": { transform: "translate(0, 5px)" },
          "80%": { transform: "translate(5px, 0)" },
          "90%": { transform: "translate(-5px, 0)" },
          "100%": { transform: "translate(0)" },
        },
        "glitch-2": {
          "0%": { transform: "translate(0)" },
          "10%": { transform: "translate(5px, 0)" },
          "20%": { transform: "translate(0, -5px)" },
          "30%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(5px, 5px)" },
          "50%": { transform: "translate(-5px, 0)" },
          "60%": { transform: "translate(5px, -5px)" },
          "70%": { transform: "translate(0, 5px)" },
          "80%": { transform: "translate(-5px, -5px)" },
          "90%": { transform: "translate(5px, 0)" },
          "100%": { transform: "translate(0)" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "pulse-border-cyan": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(6, 182, 212, 0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(6, 182, 212, 0)" },
        },
        "pulse-border-electric": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(59, 130, 246, 0)" },
        },
        "pulse-border-teal": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(20, 184, 166, 0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(20, 184, 166, 0)" },
        },
        "pulse-border-purple": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(147, 51, 234, 0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(147, 51, 234, 0)" },
        },
        "pulse-border-default": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(203, 213, 225, 0.4)" },
          "50%": { boxShadow: "0 0 0 4px rgba(203, 213, 225, 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "fadeIn": "fadeIn 0.3s ease-in",
        "glitch": "glitch 0.2s ease-in-out",
        "glitch-1": "glitch-1 0.2s linear",
        "glitch-2": "glitch-2 0.2s linear",
        "ripple": "ripple 0.6s ease-out",
        "pulse-border-cyan": "pulse-border-cyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-border-electric": "pulse-border-electric 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-border-teal": "pulse-border-teal 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-border-purple": "pulse-border-purple 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-border-default": "pulse-border-default 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
