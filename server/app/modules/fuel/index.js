var applicationFactory = require('../../../lib/application/factory'),
    app = module.exports = applicationFactory.newApplication({
        name: 'fuel'
    });

/**
 * bootstrap model
 */
require('./model');

/**
 * configure routes
 */
require('./config/routes')(app);