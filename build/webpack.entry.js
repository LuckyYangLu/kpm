var fs = require('fs');
var path = require('path');
var config = require('./config');

function readFileList (rootPath, filesList) {
  try {
    var files = fs.readdirSync(rootPath);
  } catch (err) {
    return console.error('请输入正确的项目名！');
  }

  files.map(function (itm, index) {
    var stat = fs.statSync(`${rootPath}\\${itm}`);

    // 如果是目录
    if (stat.isDirectory()) {
      // 递归读取文件
      readFileList(`${rootPath}\\${itm}\\`, filesList);
    } else {  
      if (/\.js$/.test(itm)) {
        filesList['js'][itm.replace(/\.js$/, '')] = rootPath + itm;
      }
      if (/\.(html|htm)$/.test(itm)) {
        filesList['html'][itm.replace(/\.(html|htm)$/, '')] = rootPath + itm;
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
  file: getFileList(path.resolve(__dirname, `../src/project/${config.dev.project}/`))
}