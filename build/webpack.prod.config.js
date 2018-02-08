var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entrys = require('./entrys.js');

module.exports = {
	entry: entrys,
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: 'Scripts/[name].js'
	},
	module: {
		rules: [
			{test: /\.js$/,loader:'babel-loader'},//presets:['latest'] 按照最新的ES6语法规则去转换
			{test: /\.pug$/,loader:'pug-loader',options: {pretty: true}},
			{test: /\.scss$/,use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader',{loader: 'postcss-loader',options: {config: {path: './build/postcss.config.js'}}},'sass-loader']})}
		]
	},
	plugins: [
		new webpack.BannerPlugin('Copyright 2018 Keyon Y'),
		/*new htmlWebpackPlugin({
			minify:{ //压缩HTML文件
				removeComments:true,    //移除HTML中的注释
				collapseWhitespace:true    //删除空白符与换行符
		}}),*/
		//把指定文件夹下的文件复制到指定的目录
		new TransferWebpackPlugin([
				{from: '../src/assets', to: '../dist/assets'},
				{from: '../src/Views', to: '../dist/Views'},
			],path.resolve(__dirname)),
		// webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({filename:'Contents/[name].css',disable: false,allChunks: true}),
		// 混淆压缩js和css
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				properties: false,
				warnings: false
			},
			output: {
				beautify: false,
				quote_keys: true
			},
			mangle: {
				screw_ie8: false
			},
			sourceMap: false,
            except: ['$', 'exports', 'require']    //排除关键字
		})
		/*new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./')
		})*/
	],
	stats: 'normal'
}