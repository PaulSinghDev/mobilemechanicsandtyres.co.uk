require('dotenv').config({path: './.env'});
require('express-async-await');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const fetch = require('node-fetch');
const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));
app.use(cors());
app.use(express.json());

const {
    CAPTCHA_URL,
    CAPTCHA_PORT,
    CAPTCHA_SECRET,
    SSL_KEY,
    SSL_CERT,
    SSL_PW
} = process.env;

app.post('/auth', async (req, res) => {
    const reply = await fetch(CAPTCHA_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `secret=${CAPTCHA_SECRET}&response=${req.body.token}`
    });
    const data = await reply.json();
    res.send(data);
});

const sslOptions = {
    key: fs.readFileSync(SSL_KEY),
    cert: fs.readFileSync(SSL_CERT),
    passphrase: SSL_PW
};

const httpsServer = https.createServer(sslOptions, app);

const listener = httpsServer.listen(CAPTCHA_PORT || 5000, () => console.log('Connected on port ' + listener.address().port));