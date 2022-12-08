module.exports = {
  content: ["./**/*.html", "./**/*.pug", "./**/*.md"],
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
