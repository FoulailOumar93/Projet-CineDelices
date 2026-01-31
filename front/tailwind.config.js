import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "cdOrange": "#E8650A",
        "cdOrangeLight": "#FFC854",
        "cdYellow": "#FFE69D",
        "cdBeige": "#FFFBEF",
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
