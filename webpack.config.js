const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //  -> ADDED IN THIS STEP
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: "[name].[contenthash].css",
	disable: process.env.NODE_ENV === "development"
});
// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'view/dist'),
	SRC: path.resolve(__dirname, 'view/src'),
	JS: path.resolve(__dirname, 'view/src/js'),
};

// Webpack configuration
module.exports = {
	entry: path.join(paths.JS, 'app.js'),
	output: {
		path: paths.DIST,
		filename: 'app.bundle.js',
	},
	devtool: 'source-map',
	// Tell webpack to use html plugin
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html'),
		}),
		new ExtractTextPlugin('style.bundle.css') // CSS will be extracted to this bundle file -> ADDED IN THIS STEP
		// new UglifyJSPlugin({ include: /\/includes/ })
	],
	// Loaders configuration
	// We are telling webpack to use "babel-loader" for .js and .jsx files
	module: {
		rules: [

			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
			//SASS loader to write in scss files
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },
						{ loader: 'postcss-loader', options: { sourceMap: true } },
						{ loader: 'sass-loader', options: { sourceMap: true } },
					]
				})
			},
			// File loader for image assets -> ADDED IN THIS STEP
			{
				test: /\.(png|jpg|gif|ttf|woff|svg)$/,
				use: [
					'file-loader',
				],
			}
		],
	},
	// Enable importing JS files without specifying their's extenstion
	//
	// So i can write:
	// import MyComponent from './my-component';

	resolve: {
		extensions: ['.js', '.jsx'],
	},

};

// {
//     test: /\.jsx?$/, // both .js and .jsx
//     loader: 'eslint-loader',
//     include: path.resolve(process.cwd(), 'src'),
//     enforce: 'pre',
//     options: {
//         fix: true,
//     },
// },