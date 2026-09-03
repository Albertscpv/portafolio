/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep space substrate — from the void to the lit instrument panel.
        void: "#04050A",
        space: {
          950: "#05070E",
          900: "#080B16",
          800: "#0C1020",
          700: "#12172B",
          600: "#1A2038",
          500: "#242C49",
          400: "#333C5E",
        },
        // Observatory accents. Used sparingly, like readouts on a dark console.
        ion: "#6EE7F9",
        nebula: "#A78BFA",
        pulsar: "#F472B6",
        solar: "#FBBF24",
        star: "#E9EDFA",
        dust: "#98A2C0",
        faint: "#5A6488",
      },
      fontFamily: {
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "JetBrains Mono", "Menlo", "monospace"],
      },
      fontSize: {
        // Fluid display sizes so the hero holds up from 360px to 4K.
        display: ["clamp(2.4rem, 5.4vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        title: ["clamp(1.75rem, 3.6vw, 2.85rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        lead: ["clamp(1.05rem, 1.8vw, 1.35rem)", { lineHeight: "1.6" }],
      },
      boxShadow: {
        // Neumorphism on a dark base: one light source, top-left, always.
        "neu-raised": "8px 8px 20px rgba(2,4,10,0.75), -8px -8px 20px rgba(63,74,112,0.16)",
        "neu-raised-sm": "4px 4px 10px rgba(2,4,10,0.7), -4px -4px 10px rgba(63,74,112,0.14)",
        "neu-inset":
          "inset 6px 6px 14px rgba(2,4,10,0.8), inset -6px -6px 14px rgba(63,74,112,0.14)",
        "neu-inset-sm":
          "inset 3px 3px 7px rgba(2,4,10,0.75), inset -3px -3px 7px rgba(63,74,112,0.12)",
        glass: "0 8px 32px rgba(2,4,12,0.5), inset 0 1px 0 rgba(255,255,255,0.09)",
        halo: "0 0 0 1px rgba(110,231,249,0.28), 0 0 32px -6px rgba(110,231,249,0.45)",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(rgba(148,163,205,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,205,0.055) 1px, transparent 1px)",
        "glass-sheen":
          "linear-gradient(140deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 38%, rgba(255,255,255,0) 60%)",
      },
      backgroundSize: { "grid-fine": "64px 64px" },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(3%,-4%,0) scale(1.06)" },
          "66%": { transform: "translate3d(-3%,3%,0) scale(0.96)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.15" } },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        drift: "drift 26s ease-in-out infinite",
        "drift-slow": "drift 40s ease-in-out infinite",
        orbit: "orbit 34s linear infinite",
        "orbit-slow": "orbit 68s linear infinite reverse",
        sheen: "sheen 2.6s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.6s ease-out infinite",
        blink: "blink 1.15s step-end infinite",
        marquee: "marquee 38s linear infinite",
      },
      transitionTimingFunction: {
        // A single easing vocabulary keeps the motion feeling authored, not default.
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
