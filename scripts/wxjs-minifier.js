const path = require('path');
const log = require('fancy-log');
const uglifyes = require('uglify-es');
const config = require('../config.js');
const { chalkRed, chalkGreen, getFilePath, readFileSync, createFileSync } = require('../utils.js');

// 压缩wxjs文件
const minify = (filePath, options) => {

  // 读取js文件内容
  var str = readFileSync(filePath);

  // 通过uglify-es执行js代码压缩
  str = uglifyes.minify(str, options || config.wxjsMinConfig);

  // 处理压缩结果
  if (str.error) {
    log.error(chalkRed(filePath));
    log.error(chalkRed(str.error));
  }
  else {
    log('wxjsMin:', chalkGreen(filePath));

    // 输出压缩后的代码
    createFileSync(filePath, str.code);
  }
}

module.exports = {
  minify
}
