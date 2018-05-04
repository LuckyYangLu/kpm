/**
 * 工具类
 */

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

/**
 * 通过传入的时间计算年月日和季度
 * @param {Date} time 传入的时间
 */
export function calcYearMonthDay (time) {
  const today = time ? new Date(time) : new Date();
  const _year = today.getFullYear();
  const _month = today.getMonth() + 1;
  const _quarter = parseInt(_month / 4) + 1;
  const _day = today.getDate();
  const _formatToday = `${_year}/${_month < 10 ? '0' + _month : _month}/${_day < 10 ? '0' + _day : _day}`;

  return {
    year: _year,
    month: _month,
    quarter: _quarter,
    day: _day,
    format: _formatToday
  };
}

/**
 * 数字处理
 * @param {Number} number 需要处理的数字
 * @param {Number} max 数字允许的最大值
 */
export function largeNumber (number, max) {
  if (number > max) {
    return max;
  } else {
    return number;
  }
}

/**
 * 过滤字符串,清除左右空格、特殊字符、emoji表情
 * @param {String} str 字符串
 */
export function stringFilter (str) {
  str = str.replace(/(^\s*)|(\s*$)/g, '');  // 清除左右空格
  str = str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');         // 清除emoji表情符号
  str = str.replace(/[\-\_\,\!\|\\\/\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');  // 清除特殊字符

  return str;
}