const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const log = require('fancy-log');

// 同步读取文件内容 {文件路径}
const readFileSync = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (err) {
    log.error(chalkRed(`↓ "${filePath}": walk dir error`));
    log.error(chalkRed(err.message));
    process.exit();
  }
}

// 创建文件 {文件路径， 文件路径}
const createFileSync = (filePath, content) => {

  const { filename, dirname } = getFilePath(filePath);

  // 如果目录不存在，则尝试创建文件夹
  if (!fs.existsSync(dirname)) {
    try {
      fs.mkdirSync(dirname);
    } catch (err) {
      log.error(chalkRed(`↓ "${dirname}": walk dir error`));
      log.error(chalkRed(err.message));
      process.exit();
    }
  }

  const output = path.join(dirname, filename);

  try {
    fs.writeFileSync(output, content);
  } catch (err) {
    log.error(chalkRed(`↓ "${output}": walk dir error`));
    log.error(chalkRed(err.message));
    process.exit();
  }
}

// 获取目录下的所有文件
function getDirFiles(dir) {

  // 判断路径是否存在
  if (!fs.existsSync(dir)) log.error(chalkRed(`↓ ${dir} 不存在`));

  // 该目录下的所有文件
  let results = [];

  // 该目录下的一级文件
  let files = [];

  // 读取目录下的一级文件
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    log.error(chalkRed(`↓ "${dir}": walk dir error`));
    log.error(chalkRed(err.message));
  }

  // 读取目录下的所有文件
  for (let file of files) {
    const p = path.join(dir, file);
    if(fs.statSync(p).isDirectory()) {
      results = results.concat(getDirFiles(p));
    } else {
      log('read-file:', chalkGreen(p));
      results.push(p);
    }
  }

  return results;
}

// 根据路径分析文件名和目录路径
const getFilePath = (filePath) => {
  var isWin = /^win/.test(process.platform);
  var splitChar = isWin ? '\\' : '/'
  const patharr = filePath.split(splitChar);
  const filename = patharr.pop();
  const dirname = patharr.join(splitChar);
  return { dirname, filename };
}
// 绿色字符串
const chalkGreen = (str) => {
  return chalk.green(str);
}

// 蓝色字符串
const chalkBlue = (str) => {
  return chalk.hex('#0099FF')(str);
}

// 粉色字符串
const chalkPink = (str) => {
  return chalk.hex('#FF0099')(str);
}

// 红色字符串
const chalkRed = (str) => {
  return chalk.hex('#FF0000')(str);
}

module.exports = {
  readFileSync,
  createFileSync,
  log,
  getFilePath,
  getDirFiles,
  chalkGreen,
  chalkBlue,
  chalkPink,
  chalkRed
}
