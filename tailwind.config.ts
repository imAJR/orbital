import type { Config } from "tailwindcss";

/**
 * Orbital Design Tokens — v2
 * Single source of truth. Maps directly to orbital-brand-identity.html
 *
 * Naming rules:
 *  - NEW names  → use brand identity names  (orbit-blue, void, surface…)
 *  - OLD aliases → kept for backward compat  (orbital-blue, background-dark…)
 *    so Navbar/Sidebar/PostCard still compile without touching them.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {

      /* ─────────────────────────────────────────
         COLORS
      ───────────────────────────────────────── */
      colors: {

        /* ── Brand background scale ── */
        void:    "var(--void)",      // #050508
        deep:    "var(--deep)",      // #0d0d18
        surface: "var(--surface)",   // #13131f
        rim:     "var(--rim)",       // #1e1e30
        muted:   "var(--muted)",     // #3a3a55
        subtle:  "var(--subtle)",    // #6b6b90

        /* ── Brand text scale ── */
        text: {
          DEFAULT: "var(--text)",     // #e8e8f5
          dim:     "var(--text-dim)", // #9898b8
        },

        /* ── Brand accent palette ── */
        orbit: {
          blue:   "var(--orbit-blue)",   // #4a6cf7
          violet: "var(--orbit-violet)", // #9b5cf6
          teal:   "var(--orbit-teal)",   // #22d4bf
          pink:   "var(--orbit-pink)",   // #f75a9a
          gold:   "var(--orbit-gold)",   // #f7b04a
        },

        /* ── Semantic aliases ── */
        primary:   "var(--orbit-blue)",
        secondary: "var(--orbit-violet)",
        success:   "var(--orbit-teal)",
        warning:   "var(--orbit-gold)",
        danger:    "var(--orbit-pink)",

        /* ── BACKWARD COMPAT — old names used by Navbar/Sidebar/PostCard ── */
        "orbital-blue":   "var(--orbit-blue)",
        "orbital-violet": "var(--orbit-violet)",
        "orbital-teal":   "var(--orbit-teal)",
        "orbital-pink":   "var(--orbit-pink)",
        "orbital-gold":   "var(--orbit-gold)",
        "foreground-dark":"var(--text)",
        "muted-dark":     "var(--text-dim)",
        "border-dark":    "var(--rim)",
      },

      /* ─────────────────────────────────────────
         BACKGROUND COLORS
      ───────────────────────────────────────── */
      backgroundColor: {
        /* New */
        void:    "var(--void)",
        deep:    "var(--deep)",
        surface: "var(--surface)",
        hover:   "rgba(255,255,255,0.04)",
        active:  "rgba(255,255,255,0.08)",

        /* BACKWARD COMPAT */
        "background-dark":  "var(--void)",
        "background-deep":  "var(--deep)",
        "background-hover": "rgba(255,255,255,0.04)",
      },

      /* ─────────────────────────────────────────
         BORDER COLORS
      ───────────────────────────────────────── */
      borderColor: {
        DEFAULT:       "var(--rim)",
        rim:           "var(--rim)",
        subtle:        "rgba(255,255,255,0.06)",
        /* BACKWARD COMPAT */
        "border-dark": "var(--rim)",
      },

      /* ─────────────────────────────────────────
         TEXT COLORS
      ───────────────────────────────────────── */
      textColor: {
        text:          "var(--text)",
        "text-dim":    "var(--text-dim)",
        /* BACKWARD COMPAT */
        "foreground-dark": "var(--text)",
        "muted-dark":      "var(--text-dim)",
        "orbital-blue":    "var(--orbit-blue)",
        "orbital-violet":  "var(--orbit-violet)",
        "orbital-teal":    "var(--orbit-teal)",
        "orbital-pink":    "var(--orbit-pink)",
        "orbital-gold":    "var(--orbit-gold)",
      },

      /* ─────────────────────────────────────────
         PLACEHOLDER COLOR
      ───────────────────────────────────────── */
      placeholderColor: {
        "muted-dark":  "var(--subtle)",
        subtle:        "var(--subtle)",
      },

      /* ─────────────────────────────────────────
         RING COLOR
      ───────────────────────────────────────── */
      ringColor: {
        "orbital-blue":  "var(--orbit-blue)",
        "orbit-blue":    "var(--orbit-blue)",
        "orbit-violet":  "var(--orbit-violet)",
      },

      /* ─────────────────────────────────────────
         FONTS
      ───────────────────────────────────────── */
      fontFamily: {
        display: ["var(--font-syne)",    "system-ui", "sans-serif"],
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        arabic:  ["var(--font-cairo)",   "system-ui", "sans-serif"],
        mono:    ["ui-monospace", "SFMono-Regular", "monospace"],
      },

      /* ─────────────────────────────────────────
         FONT SIZES
      ───────────────────────────────────────── */
      fontSize: {
        "2xs": ["10px", { lineHeight: "1.4" }],
        xs:    ["11px", { lineHeight: "1.5" }],
        sm:    ["13px", { lineHeight: "1.6" }],
        base:  ["14px", { lineHeight: "1.6" }],
        md:    ["16px", { lineHeight: "1.6" }],
        lg:    ["18px", { lineHeight: "1.5" }],
        xl:    ["20px", { lineHeight: "1.4" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["30px", { lineHeight: "1.2" }],
        "4xl": ["36px", { lineHeight: "1.1" }],
        "5xl": ["48px", { lineHeight: "1.0" }],
        "6xl": ["60px", { lineHeight: "0.95" }],
      },

      /* ─────────────────────────────────────────
         LETTER SPACING
      ───────────────────────────────────────── */
      letterSpacing: {
        tightest: "-0.03em",
        tighter:  "-0.02em",
        tight:    "-0.01em",
        normal:   "0em",
        wide:     "0.05em",
        wider:    "0.1em",
        widest:   "0.3em",
        label:    "0.35em",
      },

      /* ─────────────────────────────────────────
         BORDER RADIUS
      ───────────────────────────────────────── */
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },

      /* ─────────────────────────────────────────
         BOX SHADOW
      ───────────────────────────────────────── */
      boxShadow: {
        card:          "0 4px 24px rgba(0,0,0,0.4)",
        glow:          "0 0 32px rgba(74,108,247,0.3)",
        "glow-blue":   "0 0 24px rgba(74,108,247,0.40)",
        "glow-violet": "0 0 24px rgba(155,92,246,0.40)",
        "glow-teal":   "0 0 24px rgba(34,212,191,0.35)",
        "glow-pink":   "0 0 24px rgba(247,90,154,0.35)",
      },

      /* ─────────────────────────────────────────
         BACKDROP BLUR
      ───────────────────────────────────────── */
      backdropBlur: {
        card: "16px",
        nav:  "20px",
      },

      /* ─────────────────────────────────────────
         ANIMATIONS
      ───────────────────────────────────────── */
      animation: {
        "fade-up":    "fadeUp 0.8s ease forwards",
        "fade-in":    "fadeIn 0.5s ease forwards",
        "slide-up":   "slideUp 0.4s ease forwards",
        "spin-slow":  "spin-slow 12s linear infinite",
        "spin-fast":  "spin-fast 8s linear infinite reverse",
        "spin-orbit": "spin-medium 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "spin-slow":   { to: { transform: "rotate(360deg)"  } },
        "spin-fast":   { to: { transform: "rotate(-360deg)" } },
        "spin-medium": { to: { transform: "rotate(360deg)"  } },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 10px rgba(74,108,247,0.5))"  },
          "50%":      { filter: "drop-shadow(0 0 22px rgba(155,92,246,0.7))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;