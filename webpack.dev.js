require('dotenv').config({ path: './.env' });
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const postcssEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: "source-map",
    module: {
        rules: [{
                test: /(?<!\.modal)\.scss$/,
                use: [{
                        loader: ExtractCssChunksPlugin.loader,
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
                                postcssEnv()
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
                            plugins: () => [postcssEnv()],
                            sourceMap: 'inline'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            "@babel/plugin-transform-regenerator"
                        ]
                    }
                }]
            },
            {
                test: /\.(svg|jpg|png|gif)$/,
                loaders: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/img/',
                            filename: '[name].[hash].[ext]',
                            esModule: false
                        },

                    },
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false,
                                    quality: 50
                                }),
                                imageminPngquant({
                                    floyd: 0.5,
                                    speed: 2
                                }),
                                imageminSvgo({
                                    plugins: [{
                                            removeTitle: true
                                        },
                                        {
                                            convertPathData: false
                                        }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: path.resolve(__dirname, '/assets/fonts'),
                        outputPath: 'assets/fonts',
                        filename: '[name].[ext]',
                        esModule: false
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'assets/js/[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!src/views/pages/index.ejs',
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: 'ejs-webpack-loader!src/views/pages/404.ejs',
            filename: '404.html'
        }),
        new ExtractCssChunksPlugin({
            filename: 'assets/css/[name].[hash].css',
            chunkFilename: 'assets/css/[id].[hash].css',
        })
    ]
});