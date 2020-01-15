"use strict";
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSSChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'webpack-hot-middleware/client',
        '@babel/polyfill'
    ],
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-regenerator"
                        ]
                    }
                }
            },
            {
                test: /(?<!\.modal)\.scss$/,
                use: [{
                        loader: ExtractCSSChunksPlugin.loader,
                        options: {
                            hot: true,
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 3
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv()
                            ],
                            sourceMap: 'inline'
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
                test: /(\.modal\.scss)$/,
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [ postcssPresetEnv() ],
                            sourceMap: 'inline'
                        }
                    },
                    'sass-loader'
                ]
            },  
            {
                test: /\.ejs$/,
                use: [{
                        loader: 'html-loader',
                        options: {
                            interpolate: 'require'
                        }
                    },
                    'ejs-html-loader'
                ]
            },
            {
                test: /\.(svg|jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, '/assets/img'),
                        outputPath: 'assets/img',
                        filename: '[name].[ext]',
                        esModule: false
                    }
                }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/views/pages/index.ejs',
        }),
        new HtmlWebpackPlugin({
            template: './src/views/errors/404.ejs',
            filename: '404.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractCSSChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),
    ]
});