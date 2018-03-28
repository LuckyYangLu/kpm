/**
 * 工具类
 */
// import crypto from 'crypto'
// import fs from 'fs'

// 从数据中获取需要的参数，默认获取_id
export function Selection (data, params) {
  let result = [];

  if (params && params.length > 0) {
    data.forEach((item) => {
      params.forEach((param) => {
        let temp = {};
        temp['id'] = item._id;
        temp[param] = item[param];

        result.push(temp);
      }, this);
    }, this);
  } else {
    data.forEach((item) => {
      result.push(item._id);
    }, this);
  }

  return result;
}

/*
 * @name vuex中读取localStorage
 * @params {String} key 为需要读取的Storage的key
 * @params {Object} type 读取出错时需要返回的数据类型
 */
export function GetStorage (key, type) {
  try {
    const result = JSON.parse(localStorage.getItem(key));
    if (result === null || result === '') {
      return type;
    }
    return result;
  } catch (err) {
    return type;
  }
}

// 加密. 由nonce（随机数）、timestamp（时间戳）组成通过sha1加密,并signatrue（签名）
export function Crypto (data) {
}

// 去除左右空格
export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 删除左边的空格
export function ltrim (str) {
  return str.replace(/(^\s*)/g, '');
}

// 删除右边的空格
export function rtrim (str) {
  return str.replace(/(\s*$)/g, '');
}

// 判断字符串是否为空
export function isStrEmpty (text) {
  if (text === undefined || text === null || text === '' || text === 'null' || text === 'undefined') {
    return true;
  }
  return text.replace(/(\s*$)/g, '') === '';
}

// 判断对象是否为空
export function isObjEmpty (obj) {
  if (obj != null && obj !== undefined && typeof (obj) === 'object') {
    for (var p in obj) {
      return false;
    }
    return true;
  }
  return true;
}
