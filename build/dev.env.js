var merge = require('webpack-merge');
var prodEnv = require('./prod.env');
var config = require('./config');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.169.94:8084/guoyuan/oa/ydzy/myShare/"'
});
