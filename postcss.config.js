/**
 * postcss配置
 */

module.exports = {
//   parser: file.extname === '.sss' ? 'sugarss' : false,
//   plugins: {
//     'postcss-import': { root: file.dirname },
//     'postcss-cssnext': options.cssnext ? options.cssnext : false,
//     'autoprefixer': env === 'production' ? options.autoprefixer : false,
//     'cssnano': env === 'production' ? options.cssnano : false
//   }
// parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {},
    // 'postcss-url': {},
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {}
    // 'cssnano': {}
  }
};
