var path = require('path');
var _project = 'AccountTracking'; // 项目名

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/oa-jy/healthyConduct/', // 打包后的静态资源根路径
    productionSourceMap: false,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    vconsole: false, // Vconsole 是否启用
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay in the browser.
    showEslintErrorsInOverlay: false,
  },
  dev: {
    env: Object.assign({PROJECT_NAME: `'${_project}'`}, require('./dev.env')),
    port: 8080,
    autoOpenBrowser: true,
    project: _project,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
};
