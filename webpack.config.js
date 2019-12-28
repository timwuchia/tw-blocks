const autoprefixer = require('autoprefixer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

module.exports =  (env, argv) => {
	function isDevelopment() {
		return argv.mode === 'development';
	}
	var config = {
		entry: {
			editor:'./src/editor.js',
			script:'./src/script.js',
			editor_script: './src/editor_script.js'
		},
		output: {
			filename: '[name].js' // name is just the name of the bundle
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					sourceMap: true
				}),
				new OptimizeCSSAssetsPlugin(
				{
					cssProcessorOptions: {
						map: {
							inline: false,
							annotation: true
						}
					}
				})
			]
		},
		plugins: [
			new CleanPlugin(),
			new MiniCSSExtractPlugin({
				chunkFilename: "[id].css", // just remember you somehow need this line of code when using function for filename below
				filename: chunkData => {
					return chunkData.chunk.name === 'script' ? 'style.css' : '[name].css'
				}
			})
		],
		devtool: isDevelopment() ? 'cheap-module-source-map' : 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							"plugins": ["@babel/plugin-proposal-class-properties"],
							presets: [
								'@babel/preset-env',
								[
									'@babel/preset-react',
									{
										"pragma": "wp.element.createElement",
										"pragmaFrag": "wp.element.Fragment",
										"development": isDevelopment()
									}
								]
							]
						}
					}
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCSSExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									autoprefixer()
								]	
							}
						},
						'sass-loader'
					]
				}
			]
		},
		externals: {
			jquery: "jQuery",
			lodash: "lodash",
			"@wordpress/blocks": ["wp","blocks"], 
			"@wordpress/i18n": ["wp", "i18n"],
			"@wordpress/components": ["wp","components"], 
			"@wordpress/editor": ["wp", "editor"],
			"@wordpress/element": ["wp", "element"],
			"@wordpress/blob": ["wp", "blob"],
			"@wordpress/data": ["wp", "data"],
			"@wordpress/html-entities": ["wp", "htmlEntities"],
			"@wordpress/compose": ["wp", "compose"],
			"@wordpress/hooks": ["wp", "hooks"],
		}
	};
	return config;
}