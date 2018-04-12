var fs = require('fs');
var os = require('os');
var path = require('path');
var config = require('./config');
var limit = /windows/i.test(os.type()) ? '\\' : '/';

function readFileList (rootPath, filesList) {
  try {
    var files = fs.readdirSync(rootPath);
  } catch (err) {
    return console.error('请输入正确的项目名！');
  }

  files.map(function (itm, index) {
    try {
      var stat = fs.statSync(`${rootPath}${limit}${itm}`);
    } catch (err) {
      return console.error('读取文件或目录失败！');
    }

    // 如果是目录
    if (stat.isDirectory()) {
      if (!/common/i.test(itm)) {
        // 递归读取文件
        readFileList(`${rootPath}${limit}${itm}${limit}`, filesList);
      }
    } else {  
      if (/\.js$/.test(itm)) {
        filesList['js'][itm.replace(/\.js$/, '')] = rootPath + limit + itm;
      }
      if (/\.(html|htm)$/.test(itm)) {
        filesList['html'][itm.replace(/\.(html|htm)$/, '')] = rootPath + limit + itm;
      }
    }
  })
}
// 获取文件夹下的所有文件
function getFileList (rootPath) {
  var filesList = {
    js: {},
    html: {}
  };

  readFileList(rootPath, filesList);

  return filesList;
}

module.exports = {
  file: getFileList(path.resolve(__dirname, `../src/project/${config.dev.project}`))
};
