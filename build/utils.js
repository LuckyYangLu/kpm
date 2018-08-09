var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};

  var styleLoader = {
    loader: 'style-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: true,                  // 开启css压缩
      sourceMap: options.sourceMap
    }
  };

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      // sourceMap: options.sourceMap,
      // parser: '', // postcss分析器
      // exec: true, // 使postcss解析器支持CSS-in-JS
      // path: 'postcss.config.js',
      // cssnext: true,
      // autoprefixer: true
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader];

    // 开发环境下css需要style-loader处理
    // process.env.NODE_ENV === 'development' && loaders.unshift(styleLoader);
    // loader.unshift(styleLoader);
    options.usePostCSS ? loaders.push(postcssLoader) : '';

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // 抽取样式为独立的css文件,避免将样式打入js文件中
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders
      });
    } else {
      return loaders;
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = [];
  var loaders = exports.cssLoaders(options);

  for (var extension in loaders) {
    var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
};
