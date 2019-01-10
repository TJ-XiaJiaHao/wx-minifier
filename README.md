# wx-code-minifier
小程序代码压缩工具（代码压缩率为25%～30%），推荐配合[mp-parser](https://www.npmjs.com/package/mp-parser)预处理工具使用

## 使用方法

```bash
# 第一步 安装wx-code-minifier
npm install -g wx-code-minifier

# 第二步 在项目目录下运行
wx-code-minifier

# 指定压缩路径，会压缩 [src] 下所有的wxml、wxss和js文件
# 如 wx-code-minifier --src ./
wx-code-minifier --src [src]
```

## 配置文件
默认配置如下，如有需求可以通过修改项目下的 wxmin.config.js 来进行覆盖。

```js
module.exports = {
	// 源代码目录
	src: 'dist',

	wxjsMin: true,   // 是否压缩wxjs代码

	wxssMin: true,   // 是否压缩wxss代码

	wxmlMin: true,   // 是否压缩wxml代码

	wxjsMinConfig: { // wxjs压缩配置项
    mangle: {
      toplevel: true,     // 代码混淆
    },
    compress: {
      dead_code: true,    // 移除没被引用的代码
      conditionals: true, // 优化if条件判断
      warnings: true,     // 显示警告
      drop_console: true, // 删除所有console
      passes: 2           // 压缩次数
    }
	}
}
```