var webpackHotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&timeout=2000';	//reload=true的意思是，如果碰到不能hot reload的情况，就整页刷新
var isDev = process.env.NODE_ENV === 'dev';

var entryJson = {
	base: './src/Components/base/base.js',
	index: './src/Components/index/index.js',   // 首页--Default 路由
	home: './src/Components/home/home.js',
}

if(isDev) {
	var transJson = {};
	for(let e in entryJson) {
		transJson[e] = [entryJson[e], webpackHotMiddlewareScript];
	}
	module.exports = transJson;
}else {
	module.exports = entryJson;
}