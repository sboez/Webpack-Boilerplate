const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, '../src/App.js'),
	output:
	{
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, '../dist')
	},
	devtool: 'source-map',
	plugins:
		[
			new CopyWebpackPlugin({
				patterns: [
					{ from: path.resolve(__dirname, '../src/assets') }
				]
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../src/index.html'),
				minify: true
			})
		],
	module:
	{
		rules:
			[
				{
					test: /\.(html)$/,
					use: ['html-loader']
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use:
						[
							'babel-loader'
						]
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						"style-loader",
						"css-loader",
						"sass-loader"
					]
				},
				{
					test: /\.(jpg|png|gif|svg)$/,
					use:
						[
							{
								loader: 'url-loader',
								options:
								{
									limit: 8000,
									name: 'images/[hash]-[name].[ext]',
									outputPath: 'assets/images/'
								}
							}
						]
				},
				{
					test: /\.(ttf|eot|woff|woff2)$/,
					use:
						[
							{
								loader: 'file-loader',
								options:
								{
									outputPath: 'assets/fonts/'
								}
							}
						]
				},
			]
	}
}
