
// 参考html-minifier，在此基础上进行改进优化

var utils = require('./utils')
var WXMLParser = require('./wxml-parser').WXMLParser;

exports.minify = function(value) {
  return minify(value);
}

function minify(value) {
  value = utils.collapseWhitespace(value);

  var buffer = [],
      charsPrevTag,
      currentChars = '',
      hasChars,
      currentTag = '',
      currentAttrs = [],
      stackNoTrimWhitespace = [],
      stackNoCollapseWhitespace = [],
      optionalStartTag = '',
      optionalEndTag = '',
      ignoredMarkupChunks = [],
      ignoredCustomMarkupChunks = [],
      uidIgnore,
      uidAttr,
      uidPattern;

  new WXMLParser(value, {

    // 处理开始标签，标签名解析 + 属性解析
    start: function(tag, attrs, unary, unarySlash) {
      currentTag = tag;
      charsPrevTag = tag;
      hasChars = false;
      currentAttrs = attrs;

      var openTag = '<' + tag;
      buffer.push(openTag);

      // 处理所有属性
      var parts = [];
      for (var i = attrs.length, isLast = true; --i >= 0;) {
        var normalized = normalizeAttr(attrs[i]);
        if (normalized) {
          parts.unshift(buildAttr(normalized, unarySlash, isLast));
          isLast = false;
        }
      }

      if (parts.length > 0) {
        buffer.push(' ');
        buffer.push.apply(buffer, parts);
      }

      buffer.push(buffer.pop() + (unarySlash ? '/' : '') + '>');
    },

    // 处理闭合标签，标签名解析
    end: function(tag) {
      buffer.push('</' + tag + '>');
      charsPrevTag = '/' + tag;
    },

    // 处理标签内容，去除多余空格
    chars: function(text, prevTag, nextTag) {
      text = utils.collapseWhitespace(text);
      currentChars += text;
      if (text) {
        hasChars = true;
      }
      buffer.push(text);
    },
  })

  return utils.collapseWhitespace(buffer.join(''));
}

// 解析标签属性
function buildAttr(normalized, hasUnarySlash, isLast) {
  var attrName = normalized.name,
      attrValue = normalized.value,
      attr = normalized.attr,
      attrQuote = attr.quote,
      attrFragment,
      emittedAttrValue;

  // 处理属性引号，若属性不是最后一个属性，末尾补单个空格
  if (typeof attrValue !== 'undefined') {
    if (attrQuote === '"') {
      attrValue = attrValue.replace(/"/g, '&#34;');
    }
    else {
      attrValue = attrValue.replace(/'/g, '&#39;');
    }
    emittedAttrValue = attrQuote + attrValue + attrQuote;
    if (!isLast) {
      emittedAttrValue += ' ';
    }
  } else if (isLast) {
    emittedAttrValue = attrValue;
  } else {
    emittedAttrValue = attrValue + ' ';
  }

  // 属性名 + 属性值
  if (typeof attrValue === 'undefined') {
    attrFragment = attrName;
    if (!isLast) {
      attrFragment += ' ';
    }
  } else {
    attrFragment = attrName + attr.customAssign + emittedAttrValue;
  }

  return attr.customOpen + attrFragment + attr.customClose;
}


// 标签属性初始化
function normalizeAttr(attr) {
  if (attr.value) {
    attr.value = utils.trimWhitespace(attr.value);
    attr.value = utils.collapseWhitespaceAll(attr.value);
  }

  return {
    attr: attr,
    name: attr.name,
    value: attr.value
  };
}