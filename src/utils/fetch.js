import axios from 'axios';
import axiosConfig from '@/config/axios.config';

var wxRequest = function (url, data, method) {
  return new Promise((resolve, reject) => {
    data = data || {};

    function fetch (sucFun, errFun) {
      console.log('===== 数据请求开始 =====');

      axios(Object.assign(axiosConfig, {
        url: url,
        data: data,
        method: method,
        transformRequest: [
          function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
          }
        ]
      })).then((response) => {
        console.log('===== 数据请求成功 =====');
        if (response.data.status === 1) {
          resolve(response.data);
        } else {
          console.log('===== 数据请求失败 =====', response);
          reject(response.data);
        }
      }, (error) => {
        error.message = '网络错误';
        reject(error);
      });
    }

    fetch((res) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
};

export default wxRequest;
