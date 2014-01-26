var User = require('mongoose').model('User');

module.exports = {
    create: function (request, response) {
        var user = new User(request.body);
        user.provider = 'local';
        user.save(function (err) {
            request.logIn(user, function (err) {
                if (err) {
                    return next.apply(this, [err]);
                }
                return response.json(user);
            });
        });
    },
    get: function (request, response) {
        response.json(request.user.toObject());
    },
    update: function (request, response) {
        request.user.set(request.body);
        request.user.save(function (error, user) {
            response.json(user.toObject());
        });
    },
    login: function (request, response) {
        module.exports.get(request, response);
    },
    logout: function (request, response) {
        request.logOut();
        response.send(200);
    },
    loggedin: function (request, response) {
        response.send(request.isAuthenticated() ? request.user.toObject() : '0');
    }
};