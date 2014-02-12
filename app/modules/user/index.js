var applicationFactory = require('../../../lib/application/factory'),
    app = module.exports = applicationFactory.newApplication(function (app, express) {
        app.configure(function () {
            app.set('name', 'user');
            // app.use(express.bodyParser());
            app.use(express.json());
            app.use(express.urlencoded());
            app.use(express.methodOverride());
            app.use(app.router);
        });
    });

/**
 * bootstrap model
 */
require('./model');

/**
 * configure routes
 */
require('./config/routes')(app);