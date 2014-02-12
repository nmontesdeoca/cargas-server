var express = require('express'),
    app = module.exports = express(),
    utils = require('../lib/utils');

app.use(function (request, response, next) {

    response.set({
        'Access-Control-Allow-Origin': '*'
    });

    if (request.method === 'OPTIONS') {
        response.set({
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        });
        response.send(200);
    } else {
        next.apply(this);
    }
});

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