const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build']
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
console.log(111, process.env.NODE_ENV)
module.exports = {
    mode: isDev ? "development" : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist11'), //必须是绝对路径
        filename: 'bundle.[hash].js',
        publicPath: '/' //通常是CDN地址
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //10K
                            esModule: false ,
                            outputPath: 'assets'
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /.html$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            config: config.template,
            nimify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true
        }),
        new CleanWebpackPlugin() 
    ],
    devServer: {
        port: 3000,
        compress: true,
    },
    devtool: 'cheap-module-eval-source-map'
}