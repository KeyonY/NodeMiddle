var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var localOptions = require('./localOptions');

var entrys = require('./entrys.js');

module.exports = {
	entry: entrys,
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: localOptions.host,
		filename: 'Scripts/[name].js'
	},
	devtool: 'eval-source-map',
	module: {
		rules: [
			{test: /\.js$/,loader:'babel-loader'},//presets:['latest'] 按照最新的ES6语法规则去转换
			{test: /\.pug$/,loader:'pug-loader',options: {pretty: true}},
			{test: /\.scss$/,use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader',{loader: 'postcss-loader',options: {config: {path: './build/postcss.config.js'}}},'sass-loader']})},
		]
	},
	plugins: [
		new webpack.BannerPlugin('Copyright 2018 Keyon Y'),
		//把指定文件夹下的文件复制到指定的目录
		new TransferWebpackPlugin([
				{from: '../src/assets', to: '../dist/assets'},
			],path.resolve(__dirname)),
		// webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({filename:'Contents/[name].css',disable: true,allChunks: true}),
		// 允许错误不打断程序
		new webpack.NoErrorsPlugin(),
		/*new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./')
		})*/
	]
}