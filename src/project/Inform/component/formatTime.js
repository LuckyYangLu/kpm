/**
 * 格式化时间
 * @param {Number} time 时间戳
 */
module.exports = function handleFormat (time) {
  var _date = new Date(time);
  var _year = _date.getFullYear();
  var _month = _date.getMonth() + 1;
  var _day = _date.getDate();
  var _hours = _date.getHours();
  var _minutes = _date.getMinutes();
  var _seconds = _date.getSeconds();

  function validateLt (num) {
    if (num < 10) return '0' + num;
    return num;
  }

  return `${_year}-${validateLt(_month)}-${validateLt(_day)} ${validateLt(_hours)}:${validateLt(_minutes)}:${validateLt(_seconds)}`;
};