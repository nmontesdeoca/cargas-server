var express = require('express'),
    app = module.exports = express(),
    utils = require('../lib/utils');

app.use(require('./middlewares/cors'));

/**
 * configure the express application and connect to database
 */
require('../config/express')(app, express);

/**
 * require all modules into the application
 */
utils.requireModules(__dirname + '/modules', app);

/**
 * bootstrap passport configuration
 */
require('../config/passport')(require('passport'));