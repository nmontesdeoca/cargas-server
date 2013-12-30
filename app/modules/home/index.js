var application_factory = require('../../../lib/application/factory'),
    app = module.exports = application_factory.newApplication({
        name: 'home',
        views: __dirname + '/view',
        viewEngine: 'ejs',
        router: true
    });

/**
 * configure routes
 */
require('./config/routes')(app);