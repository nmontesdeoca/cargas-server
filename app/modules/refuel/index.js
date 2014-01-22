var applicationFactory = require('../../../lib/application/factory'),
    app = module.exports = applicationFactory.newApplication({
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