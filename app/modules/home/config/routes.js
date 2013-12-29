var controller = require('../controller');

module.exports = function (app) {
    app.get('/', controller.home);
};