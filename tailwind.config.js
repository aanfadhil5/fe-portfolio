/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Notion-inspired color palette
        notion: {
          bg: "#ffffff",
          "bg-alt": "#f7f6f3",
          "bg-hover": "#f1f1ef",
          "bg-card": "#ffffff",
          "bg-secondary": "#37352f0d",
          text: "#37352f",
          "text-secondary": "#787774",
          "text-muted": "#9b9a97",
          border: "#e9e9e7",
          "border-light": "#f1f1ef",
          accent: "#2383e2",
          "accent-light": "#2383e20d",
          "accent-hover": "#1a7bd8",
          success: "#0f7b0f",
          warning: "#d9730d",
          danger: "#e03e3e",
        },
        // Dark mode colors (notion-inspired dark theme)
        dark: {
          bg: "#191919",
          "bg-alt": "#1f1f1f",
          "bg-hover": "#2f2f2f",
          "bg-card": "#1f1f1f",
          "bg-secondary": "#37352f29",
          text: "#ffffff",
          "text-secondary": "#9b9a97",
          "text-muted": "#787774",
          border: "#37352f",
          "border-light": "#37352f29",
          accent: "#5f9df7",
          "accent-light": "#5f9df729",
          "accent-hover": "#7bb0f9",
          success: "#4d7c0f",
          warning: "#d97706",
          danger: "#dc2626",
        },
        // Legacy support (keeping for compatibility)
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Arial",
          "sans-serif",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "4rem" }],
        "7xl": ["4.5rem", { lineHeight: "5rem" }],
        "8xl": ["6rem", { lineHeight: "6.5rem" }],
        "9xl": ["8rem", { lineHeight: "8.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-down": "slideDown 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "pulse-gentle": "pulseGentle 3s infinite",
        float: "float 6s ease-in-out infinite",
        tilt: "tilt 10s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.5rem)" },
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-1rem)" },
        },
        tilt: {
          "0%, 50%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg)" },
          "75%": { transform: "rotate(-1deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        notion: "0 1px 3px rgba(0, 0, 0, 0.1)",
        "notion-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "notion-card": "0 2px 8px rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
      },
      transitionTimingFunction: {
        "bounce-soft": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
