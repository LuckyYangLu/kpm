var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var config = require('./config');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var uglifyjsPlugin = require('uglifyjs-webpack-plugin');
var MomentLocalesPlugin = require('moment-locales-webpack-plugin');    // moment 插件处理器

var prod = merge(common, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true, // 独立css
      usePostCSS: true // 开启postCss
    })
  },
  /*
   * source-map
   * 生产环境不可以开启，因为它们可以增加 bundle 大小，并降低整体性能。
   */
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),  // 根目录
      verbose: true,                         // 开启在控制台输出
      dry: false,                            // 是否删除文件
      exclude: []                            // 排除不删除的目录
    }),
    // 便于查看代码之间的依赖
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash:7].css')
    }),
    /**
     * 打包时,删除 moment.js 中未使用到的部分,减少体积
     */
    new MomentLocalesPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    })
  ],
  optimization: {
    minimizer: [
      // 压缩js
      new uglifyjsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
       }
      }
    }
  },
});

module.exports = prod;