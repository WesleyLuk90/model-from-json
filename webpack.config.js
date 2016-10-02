module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname,
		filename: 'index.js',
		library: 'ModelFromJSON',
		libraryTarget: 'umd',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a valid name to reference
			query: {
				presets: ['es2015'],
			},
		}],
	},
};
