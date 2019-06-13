const path = require('path');
const log = require('fancy-log');
const { chalkGreen, readFileSync, createFileSync } = require('../utils.js');
const htmlmin = require('../minifier/wxml-minifier');

// 压缩wxml文件
const minify = (filePath) => {

  var str = readFileSync(filePath);

  str = htmlmin.minify(str);

  log('wxmlMin:', chalkGreen(filePath));

  createFileSync(filePath, str);
}

module.exports = {
  minify
}
