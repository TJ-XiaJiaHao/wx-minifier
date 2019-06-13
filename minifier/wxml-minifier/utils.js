'use strict';

function createMap(values, ignoreCase) {
  var map = {};
  values.forEach(function(value) {
    map[value] = 1;
  });
  return ignoreCase ? function(value) {
    return map[value.toLowerCase()] === 1;
  } : function(value) {
    return map[value] === 1;
  };
}

// 去除两边空格
exports.trimWhitespace = function(str) {
  return str && str.replace(/^[ \n\r\t\f]+/, '').replace(/[ \n\r\t\f]+$/, '');
}

// 去除两边空格
exports.collapseWhitespace = function(str) {
  str = str.replace(/^[ \n\r\t\f\xA0]+/, '');
  str = str.replace(/[ \n\r\t\f\xA0]+$/, '');
  return str;
}

// 去除所有多余的空格，多个空格保留一个
exports.collapseWhitespaceAll = function(str) {
  return str && str.replace(/[ \n\r\t\f\xA0]+/g, function(spaces) {
    return spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
  });
}

exports.createMap = createMap;
exports.createMapFromString = function(values, ignoreCase) {
  return createMap(values.split(/,/), ignoreCase);
};
