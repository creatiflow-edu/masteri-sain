export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },

      gridColumnStart: {
        9: "9",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
      },

      gridColumnEnd: {
        17: "17",
        22: "22",
        23: "23",
        24: "24"
      },
    },
    screens: {
      xs: "0px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1600px",
      xxl: "1920px",
    },
    colors: {
      dark: "#121212",
      black: "#000000",
      white: "#ffffff",
    },
  },
  plugins: [],
};
