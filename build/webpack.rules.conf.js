const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const rules = [{
		test: /\.(css|scss|sass)$/,
		// 区别开发环境和生成环境
		use: [
			devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader',
		],
	},
	{
		test: /\.js$/,
		use: ["babel-loader"],
		// 不检查node_modules下的js文件
		// exclude: "/node_modules/"
	}, {
		test: /\.(png|jpg|gif)$/,
		use: [{
			// 需要下载file-loader和url-loader
			loader: "url-loader",
			options: {
				limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
				// 图片文件输出的文件夹
				outputPath: "images"
			}
		}]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
		}
	},
	{
		test: /\.html$/,
		// html中的img标签
		use: ["html-withimg-loader"]
	},
	{
		test: require.resolve('zepto'),
		loader: 'exports-loader?window.Zepto!script-loader'
	}
];
module.exports = rules;