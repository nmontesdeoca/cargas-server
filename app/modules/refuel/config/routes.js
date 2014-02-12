var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/refuel', authorization.requiresLogin, controller.list);
    app.post('/refuel', authorization.requiresLogin, controller.create);
    app.get('/refuel/:id', authorization.requiresLogin, controller.get);
    app.post('/refuel/:id', authorization.requiresLogin, controller.update);
    app.delete('/refuel/:id', authorization.requiresLogin, controller.delete);
};