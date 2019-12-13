"use strict";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/assets/js/main.js'
    ],
    output: {
        filename: 'assets/js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'linkTag'
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: 'assets/css',
                            outputPath: 'assets/css',
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
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
                test: /\.js$/,
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