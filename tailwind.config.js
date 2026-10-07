/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F4EF",
        sand: "#E9E1D5",
        ink: "#1C1B19",
        sage: "#6F7F69",
        wood: "#A7794F",
        muted: "#6B675F",
        line: "#DDD4C6",
        clay: "#B5543A",
        blush: "#E8B4A0",
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "28px",
        "card-lg": "36px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.03em",
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "1.02" }],
        "display-lg": ["clamp(2.25rem, 4.8vw, 4rem)", { lineHeight: "1.06" }],
        "display-md": ["clamp(1.75rem, 3.2vw, 2.75rem)", { lineHeight: "1.12" }],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(28, 27, 25, 0.18)",
        float: "0 20px 60px -20px rgba(28, 27, 25, 0.28)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
