var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/refuels', authorization.requiresLogin, controller.list);
    app.get('/refuels/create', controller.form);
    app.post('/refuels/create', controller.create);
    app.get('/refuels/edit', controller.form);
    app.put('/refuels/edit', controller.edit);
    app.get('/refuels/:id/delete', controller.delete);
};