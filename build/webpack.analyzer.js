/**
 * 分析框架和项目中间件及源码组成情况
 */

var webpack = require('webpack');
var merge = require('webpack-merge');
var utils = require('./utils');
var config = require('./config');
var common = require('./webpack.common.js');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  plugins: [
    new BundleAnalyzerPlugin({
      /**
       * 预览模式 
       * @param server 服务模式, default
       * @param static 静态模式，生成单个html报告
       * @param disabled webpack 统计数据JSON文件，需要 generateStatsFile 设置为 true
       */
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1', // 服务主机地址
      analyzerPort: 8888, // 端口
      reportFilename: 'report.html', // 静态模式下报告文件名,输出路径为 output.path
      /**
       * 在报告中显示的模块大小
       * @param stat 文件输入前的大小，未压缩
       * @param parsed 文件压缩后，减小的体积, default
       * @param gzip 文件压缩后的大小
       */
      defaultSizes: 'gzip',
      openAnalyzer: true, // 在默认浏览器中自动打开报表
      statsFilename: 'stats.json', // disabled模式下json文件名
      statsOptions: null, // 输出JSON文件的配置
      excludeAssets: null,
      logLevel: 'info' // 日志等级, info, warn, error, silent
    })
  ]
});