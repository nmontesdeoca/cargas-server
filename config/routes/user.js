var user = require('../../app/controllers/user');

module.exports = function (app, route) {
    app.use(route.get('/login', user.login));
    app.use(route.get('/logout', user.logout));
};