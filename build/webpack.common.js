var path = require('path');
var utils = require('./utils');
var config = require('./config');
var entrys = require('./webpack.entry');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 接收运行参数
var argv = require('yargs')
  .describe('debug', 'debug 环境')
  .argv;

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

if (Object.keys(entrys.file.js).length === 0) {
  console.error('entry 参数缺失,使用默认入口！');
  entrys.file.js['default'] = path.resolve(__dirname, '../src/project/default/default.js');
  entrys.file.html['default'] = path.resolve(__dirname, '../src/project/default/default.html');
}

var commonConfig = {
  entry: entrys.file.js,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),  // 根目录
      verbose: true,                         // 开启在控制台输出
      dry: false,                            // 是否删除文件
      exclude: []                            // 排除不删除的目录
    })
  ],
  module: {
    rules: [
      {
        test: /\.(html|htm)$/i,
        loader: 'html-withimg-loader',
        options: {
          attrs: [':data-src']
        }
      },
      {
        test : /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test : /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.mp3(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('assets/media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(csv|tsv)$/,
        loader: 'file-loader?name=assets/csv/[name]/[hash:7].[ext]',
      },
      {
        test: /\.xml$/,
        loader: 'file-loader',
        options: {
          name: utils.assetsPath('assets/xml/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};

// 配置 HtmlWebpackPlugin 插件
Object.keys(entrys.file.html).forEach(item => {
  commonConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, commonConfig.entry.default ? '../dist/project/default/default.html' : `../dist/project/${config.dev.project}/${item}/${item}.html`),
      template: entrys.file.html[item],
      chunks: [item],
      inject: true,
      hash: true
    })
  );
});

// 生产环境下开启 vconsole
if (process.env.NODE_ENV === 'production') {
  var vConsolePlugin = require('vconsole-webpack-plugin');
  commonConfig.plugins.push(new vConsolePlugin({enable: !!argv.debug}))
}

module.exports = commonConfig;
