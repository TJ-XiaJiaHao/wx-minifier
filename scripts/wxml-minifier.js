const path = require('path');
const log = require('fancy-log');
const { chalkGreen, readFileSync, createFileSync } = require('../utils.js');

// 覆盖npm包，原有的规则无法用到wxml上，需要有所改变
const minifierPath = path.join(__dirname, '../modules/html-minifier.js');

const outputMinifierPath = path.join(__dirname, '../node_modules/html-minifier/src/htmlminifier.js');

const minifier = readFileSync(minifierPath);

createFileSync(outputMinifierPath, minifier);

log('file-replace:', chalkGreen('build/code/modules/html-minifier.js'), chalkGreen('->'), chalkGreen('node_modules/html-minifier/src/htmlminifier.js'));

const parserPath = path.join(__dirname, '../modules/html-parser.js');

const outputParserPath = path.join(__dirname, '../node_modules/html-minifier/src/htmlparser.js');

const parser = readFileSync(parserPath);

createFileSync(outputParserPath, parser);

log('file-replace:', chalkGreen('build/code/modules/html-parser.js'), chalkGreen('->'), chalkGreen('node_modules/html-minifier/src/htmlparser.js'));

const htmlmin = require('html-minifier');

// 压缩wxml文件
const minify = (filePath) => {

  var str = readFileSync(filePath);

  str = htmlmin.minify(str, {collapseWhitespace: true, removeComments: true});

  log('wxmlMin:', chalkGreen(filePath));

  createFileSync(filePath, str);
}

module.exports = {
  minify
}
