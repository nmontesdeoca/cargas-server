var express = require('express'),
    app = module.exports = express();

/**
 * configure express application
 */
app.configure(function () {
    app.set('name', 'fuel');
    // app.use(app.router);
});

/**
 * configure routes
 */
// require('./config/routes')(app);