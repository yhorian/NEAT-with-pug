const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const PostCSSPlugin = require("eleventy-plugin-postcss");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Runs PostCSS as part of Eleventy's pipeline. Will respect postcss.config.js and tailwind.config.js
  eleventyConfig.addPlugin(PostCSSPlugin);

  // Stops partial builds on eleventy's server. Necessary for Tailwind CSS updates to be refreshed.
  eleventyConfig.setServerOptions({domdiff: false});

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  //  fix for lack of filters access in pug.
  global.filters = eleventyConfig.javascriptFunctions; 
  eleventyConfig.setPugOptions({
      globals: ['filters'], 
      debug: false
  });

  // Let Eleventy transform HTML files as pug templates.
  // Markdown files will be run through the nunjucks parser.
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "pug",
    markdownTemplateEngine: "njk"
  };
};
