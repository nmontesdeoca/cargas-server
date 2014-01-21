var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/api/fuel', authorization.requiresLogin, controller.list);
    // app.post('/api/fuel', authorization.requiresLogin, controller.create);
    // app.get('/api/fuel/:id', authorization.requiresLogin, controller.get);
};