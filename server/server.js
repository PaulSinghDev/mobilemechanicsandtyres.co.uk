const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(function (req, res, next) {
    compiler.outputFileSystem.readFile(path.join(__dirname, '../dist/','404.html'), (err, result) => {
        res.status(404).set('content-type', 'text/html').send(result).end();
    })
})

app.listen(3000, () => console.log('hey, we\'re connected on port 3000'));