var applicationFactory = require('../../../lib/application/factory'),
    app = module.exports = applicationFactory.newApplication(function (app, express) {
        app.configure(function () {
            app.set('name', 'auth');
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
require('./models/Client');
require('./models/AccessToken');
require('./models/RefreshToken');

/**
 * configure routes
 */
require('./config/routes')(app);