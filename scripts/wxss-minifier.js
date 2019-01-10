const path = require('path');
const log = require('fancy-log');
const { chalkRed, chalkGreen, getFilePath, readFileSync, createFileSync } = require('../utils.js');

// 覆盖npm包，原有的规则无法用到wxml上，需要有所改变
const parserPath = path.join(__dirname, '../modules/css-calc-parser.js');

const outputPath = path.join(__dirname, '../node_modules/reduce-css-calc/dist/parser.js');

var parser = readFileSync(parserPath);

createFileSync(outputPath, parser);

log('file-replace:', chalkGreen('build/code/modules/css-calc-parser.js'), chalkGreen('->'), chalkGreen('node_modules/reduce-css-calc/dist/parser.js'));

const cssnano = require('cssnano');

// 压缩wxss文件
const minify = (filePath) => {

  var css = readFileSync(filePath);

  cssnano.process(css, {}).then(result => {

    log('wxssMin:', chalkGreen(filePath));

    createFileSync(filePath, result.css);
  }).catch(res => {
    log.error(chalkRed(filePath));
    log.error(chalkRed(res));
  });
}

module.exports = {
  minify
}
