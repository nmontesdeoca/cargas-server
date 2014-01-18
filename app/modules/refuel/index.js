var application_factory = require('../../../lib/application/factory'),
    app = module.exports = application_factory.newApplication({
        name: 'refuel',
        bodyParser: true,
        methodOverride: true,
        router: true
    });

/**
 * bootstrap model
 */
require('./model');

/**
 * configure routes
 */
require('./config/routes')(app);