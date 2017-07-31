/**
 * webpack config for the react app.
 * @author gaurav
 */

var webpack = require ('webpack');
var path = require ('path');
var HtmlWebpackPlugin = require ('html-webpack-plugin');

var BUILD_DIR = path.resolve (__dirname, 'src/client/build');
var APP_DIR = path.resolve (__dirname, 'src/client/app');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},

	devServer: {
		contentBase: './src/client/build'
	},

	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},

	plugins:[new HtmlWebpackPlugin({
		template: './src/client/app/index.html'
	})]
}

module.exports = config;