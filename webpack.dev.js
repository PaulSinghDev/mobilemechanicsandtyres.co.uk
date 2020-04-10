require('dotenv').config('./.env');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCSSChunksPlugin = require('extract-css-chunks-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options:{
                    emitWarning: true,
                    failOnWarning: false,
                    failOnError: false
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-regenerator"]
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
        new BrowserSyncPlugin({
            files: '**/*.ejs',
            proxy: `https://localhost:${process.env.PORT}`
        }),
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!./src/views/pages/index.ejs',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!./src/views/pages/404.ejs',
            filename: '404.html'
        }),
        new ExtractCSSChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        }),
    ]
});