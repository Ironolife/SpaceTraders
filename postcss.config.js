const prod = !process.env.ROLLUP_WATCH;

function prodPluginsIfProd() {
  if (!prod) {
    return [];
  }

  const cssnanoOpts = {
    preset: ['default', { discardComments: { removeAll: true } }],
  };
  return [require('autoprefixer'), require('cssnano')(cssnanoOpts)];
}

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    ...prodPluginsIfProd(),
  ],
};
