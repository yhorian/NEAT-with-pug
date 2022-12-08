module.exports = {
  content: ["./**/*.html", "./**/*.pug", "./**/*.njx", "./**/*.md"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
