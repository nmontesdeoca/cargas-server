var controller = require('../controller');

module.exports = function (app) {
    app.post('/oauth/token', controller.token);
};