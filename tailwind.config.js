/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hosted/**/*.{handlebars,js,jsx}", "./views/**/*.{handlebars,js,jsx}", "./client/**/*.{handlebars,js,jsx}"],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Lilita One', 'ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
}

