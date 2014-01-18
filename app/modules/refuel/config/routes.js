var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/api/refuel', authorization.requiresLogin, controller.list);
    app.post('/api/refuel', authorization.requiresLogin, controller.create);
    app.get('/api/refuel/:id', authorization.requiresLogin, controller.get);
    app.post('/api/refuel/:id', authorization.requiresLogin, controller.update);
    app.delete('/api/refuel/:id', authorization.requiresLogin, controller.delete);
};