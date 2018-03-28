import axios from 'axios';

axios.defaults.withCredentials = true;

// 创建axios实例
const Axios = axios.create({
  baseURL: process.env.BASE_API,     // baseUrl
  timeout: 60000                     // 超时时间
});

// request拦截器
Axios.interceptors.request.use(config => {
  return config;
}, error => {
  Promise.reject(error);
});

// respone拦截器
Axios.interceptors.response.use(
  response => {
    if (response.data.status === 1) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    console.error('ERROR：', error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 无权限
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
