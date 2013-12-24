var controller = require('../controller');

module.exports = function (app) {
    app.use('/', controller.home);
};