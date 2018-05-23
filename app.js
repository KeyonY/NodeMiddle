var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var config = require('./config/config');
var bodyParser = require('body-parser');
var auth = require('./middleware/addUser');

var isDev = process.env.NODE_ENV === 'dev';
var app = express();
var port = config.port;


app.set('view engine', 'pug');
// 设置模板文件路径
app.set('views', path.resolve(__dirname, 'src/Views'));

// app.locals定义的键值对能在模板中直接访问
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));


if (isDev) {
    app.locals.pretty = true;
	// 开发环境，静态文件使用热插拔
	var webpack = require('webpack');
	var webpackDevMiddleware = require('webpack-dev-middleware');
	var webpackHotMiddleware = require('webpack-hot-middleware');
	var webpackDevConfig = require('./build/webpack.dev.config.js');

	var compiler = webpack(webpackDevConfig);
	// 热插拔
	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackDevConfig.output.publicPath,
		noInfo: true,
		stats: 'errors-only'
	}))
	app.use(webpackHotMiddleware(compiler, {
		heartbeat: 1000,
		noInfo: true,
	}));

	// 不能热插拔的往下执行
	var reload = require('reload');
	var http = require('http');
	var server = http.createServer(app);
	// reload(server, app);
	reload(app);
	server.listen(port, () => {
		console.log('App【dev】 is now running on port ' + 'http://127.0.0.1:' + port + '!');
	});

	// 静态目录设置必须有，开发环境读取的vendor.js不是内存文件;
  // 静态目录设置必须放在reload后面，避免页面引入reload.js报错
  app.use(express.static(path.join(config.root, 'src')));
  app.use('/', require(path.join(config.configRoot,'/routes')));
	
}else {
	// 线上环境不需要监听，只需开启node服务即可
	// 设置node的静态文件目录
	app.use(express.static(path.join(config.root, 'dist')));
  app.use('/',require(path.join(config.configRoot,'/routes')));
  app.listen(port, () => {
		console.log('App【production】 is now running on port ' + 'http://127.0.0.1:' + port + '!');
  })
}

// 捕捉 404错误 传给 error路由
app.use('*', auth, (req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 捕获 error，跳转至error页面
app.use((err, req, res, next) => {
	const sc = err.status || 500;
	res.status(sc);
	res.render('Error/error', {
		error: err,
		status: sc,
		message: err.message
	});
});
