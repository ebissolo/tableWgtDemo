var path = require('path');

module.exports = {
    watch: true,
	mode: "none",
    output: {
        path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: "/dist"
    },
    entry: {
		path: path.join(__dirname, 'src/main.js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	devtool: 'source-map',
    devServer: {
		open: true,
		port: 3000,
		host: "0.0.0.0"
    },
};