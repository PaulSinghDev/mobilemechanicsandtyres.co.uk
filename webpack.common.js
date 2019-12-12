"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/assets/js/main.js'
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/assets/js'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff2|woff|ttf|eot)$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test:/\.(svg|jpg)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        publicPath: 'assets/img',
                        outputPath: 'assets/img',
                        name: '[name].[ext]',
                        esModule: false
                    }
                }],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/pages/index.html'
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}