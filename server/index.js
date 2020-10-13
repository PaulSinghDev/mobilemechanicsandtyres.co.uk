const app = require('./app');
const spdy = require('spdy');
const fs = require('fs');
const config = require('./utils/config');
const logger = require('./utils/logger');

const sslOptions = {
    key: fs.readFileSync(config.SSL_KEY),
    cert: fs.readFileSync(config.SSL_CERT)
};

const https = spdy.createServer(sslOptions, app);

https.listen(config.PORT, () => {
    logger.info(`Server connected on port ${config.PORT}`);
});