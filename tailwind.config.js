const prod = !process.env.ROLLUP_WATCH;

module.exports = {
  important: true,
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: {
    content: ['./src/**/*.svelte'],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
    enabled: prod,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Condensed', 'sans-serif'],
      },
      boxShadow: {
        DEFAULT:
          '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        lg:
          '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover', 'active'],
    },
  },
};
