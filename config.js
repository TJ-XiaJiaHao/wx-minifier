module.exports = {
	// 源代码目录
	src: 'dist',

	wxjsMin: true,

	wxssMin: true,

	wxmlMin: true,

	wxjsMinConfig: {
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