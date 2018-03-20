var baseURL = 'http://ahqq.emoney.cn/guba/index.php?s=/Home/User';
var loadObj;

var h5 = function () {};

// 请求数据
h5.prototype.fetch = function (url) {
  return new Promise(function (resolve, reject) {
    var xmlhttp;

    if (window.XMLHttpRequest) {
      //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5 浏览器执行代码
      /* eslint not-defined */
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          try {
            var result = JSON.parse(xmlhttp.responseText);
          } catch (err) {
            showModal({
              title: '错误',
              content: '服务器错误,请稍后再试！',
              showCance: false,
              confirmText: '知道了',
              success: function (e) {
                hideModal(e);
              }
            });
          }

          if (result.code === '00') {
            resolve(result.data);
          } else {
            if (result.code === '10') {
              // 访问的浏览器非微信浏览器
              window.location.href = '/guba/dati/error.html?v=' + Math.random();
            } else if (result.code === '11') {
              // 授权失败
              window.location.href = '/guba/dati/close.html?v=' + Math.random();
            } else {
              // 其它错误
              console.log('其它错误');
              reject(result);
            }
          }
        } else {
          h5.showModal({
            title: '警告',
            content: '网络故障！请稍后再试',
            showCance: false,
            confirmText: '知道了',
            success: function (e) {
              h5.hideModal(e);
            }
          });
        }
      }
    };

    xmlhttp.open('GET', `${baseURL}${url}`, true);
    xmlhttp.send();
  });
};

/**
 * 获取url中的查询参数
 * @param {String} name URL中的参数名
 */
h5.prototype.getQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 显示loading
 * @param {title} opt.title loading文本
 */
h5.prototype.showLoading = function (opt) {
  try {
    if (!opt || !opt.title) throw new Error('title is undefined');

    loadObj = document.createElement('div');
    var AniObj = document.createElement('div');
    var TextObj = document.createElement('p');

    loadObj.className = 'loading';
    AniObj.className = 'loading-circle';
    TextObj.className = 'loading-text';
    TextObj.innerText = opt.title;

    for (var i = 0, j = 12; i < j; i++) {
      var itemObj = document.createElement('div');
      itemObj.className = 'circle-child circle' + (i + 1);
      AniObj.appendChild(itemObj);
    }

    loadObj.appendChild(AniObj);
    loadObj.appendChild(TextObj);

    document.querySelector('body').appendChild(loadObj);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 关闭loading
 */
h5.prototype.hideLoading = function () {
  loadObj.remove();
};

/**
 * 显示模态框
 * @param {String} opt.title 标题
 * @param {String} opt.content 内容
 * @params {Boolean} opt.showCance 是否显示取消按钮
 * @params {String} opt.confirmText 确认按钮的文本信息
 * @params {String} opt.confirmColor 确认按钮的文本颜色
 */
h5.prototype.showModal = function (opt) {
  var modalBg = document.createElement('div');
  var modalBox = document.createElement('div');
  var modalTitle = document.createElement('div');
  var modalBody = document.createElement('div');
  var modalFoot = document.createElement('div');
  var confirm = document.createElement('span');  // 确定按钮
  var cancel = document.createElement('span');   // 取消按钮

  modalBg.id = 'modalBg';
  modalBg.className = 'modal-bg';
  modalBox.className = 'modal';

  // 标题
  modalTitle.className = 'modal-title';
  modalTitle.innerText = opt.title;
  modalBox.appendChild(modalTitle);

  // 内容
  modalBody.className = 'modal-body';
  modalBody.innerText = opt.content;
  modalBox.appendChild(modalBody);

  modalFoot.className = 'modal-foot';

  // 取消按钮
  if (opt.showCance) {
    cancel.className = 'btn';
    cancel.innerText = opt.cancelText || '取消';
    cancel.style.color = opt.cancelColor || '#000000';
    cancel.addEventListener('click', function (e) {
      opt.fail(e);
    });
    modalFoot.appendChild(cancel);
  }

  // 确定按钮
  confirm.className = 'btn';
  confirm.innerText = opt.confirmText || '确定';
  confirm.style.color = opt.confirmColor || '#3CC51F';
  confirm.addEventListener('click', function (e) {
    opt.success(this);
  });

  modalFoot.appendChild(confirm);
  modalBox.appendChild(modalFoot);

  var body = document.querySelector('body');
  body.appendChild(modalBg);
  body.appendChild(modalBox);
};

/**
 * 关闭模态框
 * @param {Document} event 按钮对象
 */
h5.prototype.hideModal = function (event) {
  document.getElementById('modalBg').remove();
  document.querySelector('body').removeChild(event.parentNode.parentNode);
};

/**
 * Toast
 * @params {String} opt.title 标题
 * @params {String} opt.image 图片路径
 * @params {String} opt.duration 延时关闭的时间
 */
h5.prototype.showToast = function (opt) {
  var toastObj = document.createElement('div');
  var ImgObj = new Image();
  var TextObj = document.createElement('p');

  toastObj.className = 'toast';
  ImgObj.src = opt.image;
  ImgObj.className = 'toast-img';
  TextObj.className = 'toast-des';
  TextObj.innerText = opt.title;

  toastObj.appendChild(ImgObj);
  toastObj.appendChild(TextObj);

  document.querySelector('body').appendChild(toastObj);

  var clock = setTimeout(function () {
    toastObj.remove();
  }, opt.duration);
};

h5 = new h5();

module.exports = h5;
