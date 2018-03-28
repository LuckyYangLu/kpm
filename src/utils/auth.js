/**
 * 存储Cookie
 * @Syntaxes setCookie(name, value[, end[, path[, domain[, secure]]]])
 * @params {String} sKey cookie名。必须
 * @params {String} sValue cookie值。必须
 * @params {String} vEnd 过期时间，单位s（默认会话结束时过期）
 * @params {String} sPath 存储路径（默认当前文档位置的路径）
 * @params {String} sDomain 作用域名（默认当前文档位置的路径的域名部分）
 * @params {String} bSecure 是否限定https协议传输
 */
var setCookie = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) { return false }
  var sExpires = ''

  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
        break
      case String:
        sExpires = '; expires=' + vEnd
        break
      case Date:
        sExpires = '; expires=' + vEnd.toUTCString()
        break
    }
  }
  document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
  return true
}

/**
 * 读取Cookie的值
 * @Syntaxes getCookie(name)
 * @params {String} sKey Cookie名。必须
 * @return {String} 返回Cookie值
 */
var getCookie = function (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
}

/**
 * 删除Cookie
 * @Syntaxes removeCookie(name)
 * @params {String} sKey cookie名
 * @params {String} sPath 存储路径（默认当前文档位置的路径）
 * @params {String} sDomain 作用域名（默认当前文档位置的路径的域名部分）
 */
var removeCookie = function (sKey, sPath, sDomain) {
  if (!sKey || !hasCookie(sKey)) { return false }
  console.log(encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : ''))
  document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
  return true
}

/**
 * 检查一个Cookie是否存在
 * @Syntaxes hasCookie(name)
 * @params {String} sKey Cookie名，必须
 * @return {Boolean} true|false 是否有指定的Cookie
 */
var hasCookie = function (sKey) {
  return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
}

/**
 * 得到所有Cookie的列表
 * @return {Array} 所有Cookie的key所组成的数组
 */
var CookieKeys = function () {
  var aKeys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:=[^;]*)?;\s*/)
  for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
  return aKeys
}

module.exports = {
  setCookie,
  getCookie,
  removeCookie,
  hasCookie,
  CookieKeys
}
