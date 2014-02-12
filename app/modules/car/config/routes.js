var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/car', authorization.requiresLogin, controller.list);
    app.post('/car', authorization.requiresLogin, controller.create);
    app.get('/car/:id', authorization.requiresLogin, controller.get);
    app.delete('/car/:id', authorization.requiresLogin, controller.delete);
};