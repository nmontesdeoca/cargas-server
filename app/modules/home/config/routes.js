var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/', controller.home);
    app.get('/beta', authorization.requiresLogin, controller.beta);
};