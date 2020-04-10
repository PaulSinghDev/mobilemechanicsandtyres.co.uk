"use strict";
const path = require('path');

module.exports = {
    entry: [
        '@babel/polyfill',
        './src/assets/js/main.js'
    ],
    output: {
        filename: 'assets/js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
};