"use strict";
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
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
                test: /\.css$/,
                use: [
                    {
                        loader: ExtractCSSChunksPlugin.loader,
                        options: {
                            publicPath: '/',
                            hot: true,
                        }
                    },
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractCSSChunksPlugin({
            filename: 'assets/css/[name].css',
            chunkFilename: 'assets/css/[id].css',
        })
    ]
});