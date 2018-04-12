var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://www.easy-mock.com/mock/5ab9e9c77f0aed1e45c3e81a/example/guoyuan/oa/ydzy/myShare/v1/"'
  BASE_API: '"http://192.168.169.94:8084/guoyuan/oa/ydzy/myShare/"'
});
