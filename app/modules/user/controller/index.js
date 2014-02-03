var User = require('mongoose').model('User');

module.exports = {
    create: function (request, response) {
        request.body.provider = 'local';

        new User(request.body).save(function (err, user) {
            if (err) {
                response.send(err);
            }
            response.json(user);
        });
    },
    get: function (request, response) {
        response.json(request.user.toObject());
    },
    update: function (request, response) {
        console.log('SETTING SOME FIELDS', request.user.set(request.body));
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
    }
};