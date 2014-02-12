var applicationFactory = require('../../../lib/application/factory'),
    app = module.exports = applicationFactory.newApplication(function (app, express) {
        app.configure(function () {
            app.set('name', 'fuel');
            app.use(express.bodyParser());
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