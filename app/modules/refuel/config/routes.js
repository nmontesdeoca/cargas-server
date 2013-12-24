var controller = require('../controller');

module.exports = function (app) {
    app.get('/refuels', controller.list);
    app.get('/refuels/create', controller.form);
    app.post('/refuels/create', controller.create);
    app.get('/refuels/edit', controller.form);
    app.put('/refuels/edit', controller.edit);
    app.get('/refuels/:id/delete', controller.delete);
};