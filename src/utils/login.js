import axios from 'axios';
import wxRequest from '@/utils/fetch';
import axiosConfig from '@/config/axios.config';

var isLogin = false;

// 请求登陆
function requestLogin () {      
  return new Promise((resolve, reject) => {
    // 创建axios实例
    if (!isLogin) {
      isLogin = true;

      const Axios = axios.create(axiosConfig);

      console.log('===== 开始登陆 ======');

      Axios.get('/ydzy/login.html?password=123456&userId=010730000020&captcha=UO7IRH')
        .then((res) => {
          if (res.data.success) {
            console.log('===== 登陆成功 ======');
            resolve();
          } else {
            console.log('===== 登陆失败 ======');
            reject();
          }
        }, (err) => {
          reject();
        });
    } else {
      resolve();
    }
  });
}

export default requestLogin;

