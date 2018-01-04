module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: 'js/',
		publicPath: 'js/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}]
	},
	resolve: {
		extensions: ['', '.js']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './'
	}
};
