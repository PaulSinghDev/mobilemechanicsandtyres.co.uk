require('dotenv').config({path: './.env'});
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.dev');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');

const app = express();
const compiler = webpack(config);

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'sha256-UTjtaAWWTyzFjRKbltk24jHijlTbP20C1GUYaWPqg7E='"],
        scriptSrc: ["'self'", "'sha256-ThhI8UaSFEbbl6cISiZpnJ4Z44uNSq2tPKgyRTD3LyU='", "'sha256-/BSKBoGP/z8z9i9rIj8KqsiL+WfrO8Kjt1j4ew+hI9M='", "*.googletagmanager.com", "*.google.com", "*.gstatic.com"],
    }
}));
app.use(cors());
app.use(express.json());

const {
    SSL_KEY,
    SSL_CERT,
    SSL_PW,
    PORT
} = process.env;

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    writeToDisk: true
}));

app.use(function (req, res, next) {
    compiler.outputFileSystem.readFile(path.join(__dirname, '../dist/','404.html'), (err, result) => {
        res.status;
    });
});

const sslOptions = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
    passphrase: SSL_PW
};

const httpsServer = https.createServer(sslOptions, app);

const listener = httpsServer.listen(PORT || 3000, () => console.log('Connected on port ' + listener.address().port));