#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = require('fancy-log');
const program = require('commander');
const pkg = require('./package.json');
const { chalkPink, chalkBlue, chalkGreen, getDirFiles } = require('./utils.js');

program
	.version(pkg .version)
	.option('-s, --src [path]', 'config code source')
	.parse(process.argv);

// 自定义配置
let config = require('./config.js');
const confPath = path.join(process.cwd(), 'wxmin.config.js');
if (fs.existsSync(confPath)) {
  config = Object.assign({}, config, require(confPath));
}
if (program.src) {
	config.src = program.src;
}

log('Starting', `'${chalkBlue('CodeMin')}'...`);

const start = new Date();
const wxssMinify = require('./scripts/wxss-minifier.js');
const wxmlMinify = require('./scripts/wxml-minifier.js');
const wxjsMinify = require('./scripts/wxjs-minifier.js');
const folderPath = path.resolve(config.src);
const files = getDirFiles(folderPath);

for (let file of files) {
  if (!fs.statSync(file).isFile()) continue;
  else if (file.endsWith(`.wxml`) && config.wxmlMin) wxmlMinify.minify(file);
  else if (file.endsWith(`.wxss`) && config.wxssMin) wxssMinify.minify(file);
  else if (file.endsWith(`.js`) && config.wxjsMin)   wxjsMinify.minify(file, config.wxjsMinConfig);
}


log('Finished', `'${chalkBlue('CodeMin')}'`, 'after', chalkPink(new Date() - start), chalkPink('ms'));