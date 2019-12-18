"use strict";
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const ExtractCSSChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: ExtractCSSChunksPlugin.loader,
                        options: {
                            hot: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                          }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:['html-loader']
            },
            {
                test:/\.(svg|jpg|png|gif)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, '/assets/img'),
                        outputPath: 'assets/img',
                        name: '[name].[ext]',
                        esModule: false
                    }
                }],
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractCSSChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),
    ]
});

