const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/index.html"],
  theme: {
    fontFamily: {
      mono: ["Inconsolata", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
