var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.post('/api/user', controller.create);
    app.get('/api/user', authorization.requiresLogin, controller.get);
    app.post('/api/user/:id', authorization.requiresLogin, controller.update);
};