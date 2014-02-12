var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.post('/login', authorization.loginMiddleware, controller.login);
    app.post('/user', controller.create);
    app.get('/user', authorization.requiresLogin, controller.get);
    app.post('/user/:id', authorization.requiresLogin, controller.update);
};