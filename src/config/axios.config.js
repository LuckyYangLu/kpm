/**
 * axios 请求配置文档
 */
const BASEURL = process.env.NODE_ENV === 'development' ? 'https://gycxtz.com.cn/guoyuan/oa/' : location.origin + '/guoyuan/oa/';

module.exports = {
  baseURL: BASEURL,
  timeout: 60000,                     // 超时时间
  withCredentials: true,              // 允许cookie
  proxy: {
    '/ydzy/': {
      target: BASEURL,
      changeOrigin: true,
      pathRewrite: {
        '^/ydzy': '/ydzy'
      }
    }
  }
};
