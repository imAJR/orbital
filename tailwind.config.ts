import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── ORBITAL BRAND COLORS ──
        orbital: {
          blue: "#4a6cf7",
          violet: "#9b5cf6",
          teal: "#22d4bf",
          pink: "#f75a9a",
          gold: "#f7b04a",
          void: "#050508",
          deep: "#0d0d18",
          surface: "#13131f",
          rim: "#1e1e30",
          muted: "#3a3a55",
          subtle: "#6b6b90",
          text: "#e8e8f5",
          textDim: "#9898b8",
        },

        // ── SEMANTIC COLORS ──
        primary: {
          DEFAULT: "#4a6cf7",
          light: "#9b5cf6",
          dark: "#3a54d7",
        },
        background: {
          DEFAULT: "rgba(5, 5, 8, 0.65)",
          dark: "rgba(5, 5, 8, 0.65)",
          light: "rgba(255, 255, 255, 0.8)",
          hover: "rgba(30, 30, 48, 0.6)",
          deep: "rgba(13, 13, 24, 0.8)",
          card: "rgba(19, 19, 31, 0.6)",
        },
        surface: {
          dark: "rgba(19, 19, 31, 0.6)",
          light: "rgba(245, 245, 247, 0.8)",
          DEFAULT: "#13131f",
        },
        foreground: {
          dark: "#e8e8f5",
          light: "#0d0d18",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          dark: "rgba(255, 255, 255, 0.08)",
          light: "rgba(0, 0, 0, 0.1)",
        },
        text: {
          DEFAULT: "#e8e8f5",
          secondary: {
            dark: "#9898b8",
            light: "#6b6b90",
          }
        },
        muted: {
          DEFAULT: "#3a3a55",
          dark: "#9898b8",
          light: "#6b6b90",
        },

        // ── STATE COLORS ──
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },

      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },

      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
      },

      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
      },

      boxShadow: {
        "soft-xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "soft-sm": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        "soft-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        "soft-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)",

        "glow-blue": "0 0 20px rgba(74, 108, 247, 0.3)",
        "glow-violet": "0 0 20px rgba(155, 92, 246, 0.3)",
        "glow-teal": "0 0 20px rgba(34, 212, 191, 0.3)",
        "glow-pink": "0 0 20px rgba(247, 90, 154, 0.2)",

        "card-sm": "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-md": "0 4px 12px rgba(0, 0, 0, 0.12)",
        "card-lg": "0 8px 24px rgba(0, 0, 0, 0.15)",
      },

      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },

      animation: {
        "orbit-spin": "orbit-spin 8s linear infinite",
        "pulse-soft": "pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-in": "slide-in 0.3s ease-out",
        "bounce-gentle": "bounce-gentle 1s ease-in-out infinite",
      },

      keyframes: {
        "orbit-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },

      transitionDuration: {
        DEFAULT: "300ms",
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "500": "500ms",
      },

      transitionTimingFunction: {
        orbital: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      zIndex: {
        dropdown: "1000",
        sticky: "1020",
        fixed: "1030",
        modalBackdrop: "1040",
        modal: "1050",
        popover: "1060",
        tooltip: "1070",
      },
    },
  },
  plugins: [],
};

export default config;
