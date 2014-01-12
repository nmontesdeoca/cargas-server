var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/refuels', authorization.requiresLogin, controller.list);
    app.get('/refuels/create', authorization.requiresLogin, controller.form);
    app.post('/refuels/create', authorization.requiresLogin, controller.create);
    app.get('/refuels/edit', authorization.requiresLogin, controller.form);
    app.put('/refuels/edit', authorization.requiresLogin, controller.edit);
    app.get('/refuels/:id/delete', authorization.requiresLogin, controller.delete);


    app.post('/refuel', authorization.requiresLogin, controller.createJSON);
    app.get('/refuels2', authorization.requiresLogin, controller.listJSON);
};