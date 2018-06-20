var path = require('path');
var utils = require('./utils');
var config = require('./config');
var entrys = require('./webpack.entry');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vueLoaderConfig = require('./vue-loader.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

// entry 参数缺失，使用默认入口
if (Object.keys(entrys.file.js).length === 0) {
  console.error('entry 参数缺失,使用默认入口！');

  entrys.file.js['default'] = path.resolve(__dirname, '../src/project/default/default.js');
  entrys.file.html['default'] = path.resolve(__dirname, '../src/project/default/default.html');
}

entrys.file.js['polyfille'] = 'babel-polyfill';
// entrys.file.js['react'] = ['react', 'react-dom'];
// entrys.file.js['antd'] = ['antd-mobile'];

var commonConfig = {
  entry: entrys.file.js,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.less', '.jsx', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(html|htm)$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
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
      // react组件的处理
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      // vue组件的处理
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
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
      filename: commonConfig.entry.default ? '../dist/project/default/default.html' : entrys.file.html[item].replace('src', 'dist'),
      template: entrys.file.html[item],
      chunks: ['manifest', 'vendor', item],  // 引入的模块
      excludeChunks: [],                     // 排除的模块
      showErrors: true,              // 是否将错误信息写在页面中,默认true.出错信息被 pre 标签包裹并添加在页面上
      inject: true,                  // 静态资源在body后插入 
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
      minify: {
        caseSensitive: false,        // 是否大小写敏感
        removeComments: true,        // 去除注释
        collapseWhitespace: true,    // 去除空格
        removeAttributeQuotes: true  // 去除空属性
      },
      hash: true
    })
  );
});

module.exports = commonConfig;
