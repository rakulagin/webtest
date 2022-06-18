const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './js/index.js',
    mode: 'development',
    output: {
        filename: "main.[contenthash].js",
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(mp3|mp4)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },

            // {
            //     test: /\.mp4$/i,
            //     use: [
            //         'file-loader'
            //     ]
            // },

            {
                test: /\.(png|jpg|jpeg|gif|mp3)$/i,
                use: [
                    {
                        loader: "img-optimize-loader",
                        options: {
                            compress: {
                                mode: 'high',
                                webp: true,
                                gifsicle: true,
                                disableOnDevelopment: false
                            }
                        }
                    }
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: resolve(__dirname, 'index.html') }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),


    ],
    devServer: {
        watchFiles: ["./*"],
        port: '3000',
        open: true,
        hot: true,
    }
}