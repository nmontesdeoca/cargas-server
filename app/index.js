var express = require('express'),
    app = module.exports = express();

/**
 * configure the express application and connect to database
 */
require('../config/express')(app, express);

/**
 * require all modules into the application
 */
require('../lib/utils').requireModules(__dirname + '/modules', app);

/**
 * bootstrap passport configuration
 */
require('../config/passport')(require('passport'), require('../config/config')(app));
