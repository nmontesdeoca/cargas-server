var controller = require('../controllers');

module.exports = function (app) {
    app.get('/login', controller.login);
    app.get('/account', controller.accountForm);
    app.put('/account', controller.accountSave);
    app.get('/logout', controller.logout);
};