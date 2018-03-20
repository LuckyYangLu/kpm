var webpack = require('webpack');
var utils = require('./utils');
var config = require('./config');
var merge = require('webpack-merge');
var HTMLWebpackPlugin = require('html-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  /*
   * 开启 source-map
   * 避免在生产中使用 inline-*** 和 eval-***，因为它们可以增加 bundle 大小，并降低整体性能。
   */
  devtool: 'source-map',
  plugins: [
    // 在打包后的 bundle.js 中删除源代码中未使用的代码
    new UglifyJSPlugin({
      // 开启 source-map 配套配置
      sourceMap: true
    }),
    // 便于查看代码之间的依赖
    new webpack.NamedModulesPlugin()
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css')
    // })
    // 指定环境
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': json.stringify('production')
    // })
  ],
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: config.build.productionSourceMap,
    //   extract: false
    // })
    rules: [
      {
        test: /\.css$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('css/[name].[hash:7].[ext]')
        }
      }
    ]
  }
});