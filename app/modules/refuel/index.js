var express = require('express'),
    app = module.exports = express();

/**
 * configure express application
 */
app.configure(function () {
    app.set('name', 'refuel');
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

/**
 * bootstrap model
 */
require('./model');

/**
 * configure routes
 */
require('./config/routes')(app);