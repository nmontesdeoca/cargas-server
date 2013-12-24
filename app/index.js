var express = require('express'),
    app = module.exports = express(),
    utils = require('../lib/utils');

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
require('../config/passport')(require('passport'), require('../config/config')(app));

/**
 * bootstrap ejs filters
 */
utils.requirePath(__dirname + '/views/filters');