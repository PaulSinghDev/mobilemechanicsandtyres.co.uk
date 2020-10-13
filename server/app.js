const express = require('express');
const helmet = require('helmet');
const path = require('path');
const compression = require('compression');
const indexRouter = require('./controllers/index');
const mailRouter = require('./controllers/mail');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const cors = require('cors');
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(middleware.requestLogger);
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/', indexRouter);
app.use('/mail', mailRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
