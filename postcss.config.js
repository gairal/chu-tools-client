const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const reporter = require('postcss-reporter');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
    cssnano,
    reporter({ clearReportedMessages: true }),
  ],
};
