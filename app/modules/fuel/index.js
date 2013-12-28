var application_factory = require('../../../lib/application/factory'),
    app = module.exports = application_factory.newApplication({
        name: 'usefuel'
    });

/**
 * configure routes
 */
// require('./config/routes')(app);