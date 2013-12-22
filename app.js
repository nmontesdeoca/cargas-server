var koa = require('koa'),
    app = koa(),
    utils = require('./lib/utils'),
    mongoose = require('mongoose');

/**
 * x-response-time
 */
app.use(require('koa-response-time')());

/**
 * logger
 */
app.use(require('koa-logger')());

/**
 * serve static files
 */
app.use(require('koa-static')(__dirname + '/public'));

/**
 * bootstrap models
 */
utils.requirePath(__dirname + '/models');

/**
 * bootstrap ejs filters
 */
utils.requirePath(__dirname + '/views/filters');

/**
 * configure application
 */
require('./config/app');

/**
 * bootstrap database connection
 */
mongoose.connect(app.get('database'));

/**
 * body parsing
 */
app.use(require('./lib/body-parser')());

/**
 * server starts listening
 */
app.listen(process.env.PORT || 3000);
console.log('listening on port ' + (process.env.PORT || 3000));