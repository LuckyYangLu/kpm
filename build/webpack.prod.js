var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var config = require('./config');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  /*
   * source-map
   * 生产环境不可以开启，因为它们可以增加 bundle 大小，并降低整体性能。
   */
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  plugins: [
    // 配置生产环境下的全局常量
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    // js 代码的处理，压缩、美化等
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false   // 删除无用代码时关闭警告
      },
      // 开启 source-map
      sourceMap: true
    }),
    // 便于查看代码之间的依赖
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash:7].css')
    }),
    // new OptimizeCSSPlugin(),
    // 抽取公共模块为 vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 配置抽取出的公共模块在webpack中的入口,入口文件在 manifest.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
});