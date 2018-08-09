var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
var entrys = require('./webpack.entry');
var common = require('./webpack.common.js');

var _openPage;

// 选择默认打开的页面
if (common.entry.default) {
  _openPage = 'project/default/default.html';
} else {
  let _pageStr = '';

  if (entrys.file.html.index) {
    _pageStr = entrys.file.html['index'];
  } else {
    _pageStr = entrys.file.html[Object.keys(entrys)[0]];
  }

  _openPage = _pageStr.slice(_pageStr.indexOf('project'));
}

var webpackDevConfig = merge(common, {
  mode: 'development',
  // 开启 source map,不可用于生产环境
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
    // 开发环境下的全局常量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': config.dev.env
    })
  ],
  // 开发服务器
  devServer: {
    // 将 './' 目录作为可访问目录
    contentBase: './src/',
    /*
     * 自动打开浏览器
     * 默认使用默认浏览器。要指定不同的浏览器，在命令行中 webpack-dev-server --open 'Google Chrome'
     */
    open: true,
    // 打开浏览器时的首页
    openPage: _openPage,
    /**
     * 当有编译器错误或警告时，在浏览器中全屏显示。默认禁用。
     */
    overlay: {
      warnings: true,
      errors: true
    },
    /**
     * 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
     */
    quiet: false,
    /**
     * 启用 webpack 的模块热替换特性。
     * 需要在 plugin 中添加 new webpack.HotModuleReplacementPlugin()
     */
    hot: true,
    // 启用history模式，任意404都可能被替代为index.html
    historyApiFallback: true,
    // 实时刷新
    inline: true,
    // 一切服务都启用gzip压缩
    compress: true,
    // 端口，默认为 "8080"
    port: config.dev.port,
    // 代理
    proxy: config.dev.proxyTable
  }
});

module.exports = webpackDevConfig;
