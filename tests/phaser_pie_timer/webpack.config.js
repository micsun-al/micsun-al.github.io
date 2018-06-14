var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

var definePlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			path.resolve(__dirname, 'src/scripts/main.js')
		],
		vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
	},
	devtool: 'cheap-source-map',
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, 'dist'),
		publicPath: './dist/',
		filename: 'bundle.js'
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: [/node_modules/, '.DS_Store']
	},
	plugins: [
		definePlugin,
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'/* chunkName= */, filename: 'vendor.bundle.js'/* filename= */
		}),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './src/index.html',
			chunks: ['vendor', 'app'],
			chunksSortMode: 'manual',
			minify: {
				removeAttributeQuotes: false,
				collapseWhitespace: true,
				html5: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true,
				removeComments: true,
				removeEmptyAttributes: true
			},
			hash: true
		}),
		new CopyWebpackPlugin([
			{ from: 'assets', to: 'assets' }
		]),
		new BrowserSyncPlugin({
			notify: true,
			host: process.env.IP || 'localhost',
			port: process.env.PORT || 3200,
			server: {
				baseDir: ['./', './build']
			}
		}),
		new webpack.ProvidePlugin({
			'globals': 'globals'
		})
	],
	module: {
		rules: [
			{ test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
			{ test: /pixi\.js/, use: ['expose-loader?PIXI'] },
			{ test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
			{ test: /p2\.js/, use: ['expose-loader?p2'] },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{ test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, use: ['file-loader?name=[name].[ext]'] },
			{ test: /\.fnt$/, use: ['xml-loader'] },
			{ test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, use: 'url-loader?limit=100000' },
		]
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	resolve: {
		extensions: ['.js', '.json', '.png', '.mp3', '.fnt'],
		alias: {
			phaser: phaser,
			pixi: pixi,
			p2: p2,
			globals: path.resolve(__dirname, './src/scripts/globals.js')
		}
	}
}
