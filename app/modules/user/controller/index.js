var User = require('mongoose').model('User'),
    messages = require('../../../../config/messages'),
    utils = require('../../../../lib/utils');

module.exports = {
    create: function (request, response) {
        User
            .findOne({ email: request.body.email })
            .exec(function (error, user) {
                if (error) {
                    response.json(utils.createError(error));
                } else if (!user) {
                    new User(request.body).save(function (error, user) {
                        if (error) {
                            response.json(utils.createError(error));
                        }

                        response.json(user);
                    });
                } else {
                    response.json(utils.createError(messages.emailAlreadyRegistered));
                }
            });
    },
    login: function (request, response) {
        response.json({
            authenticated: request.isAuthenticated()
        });
    },
    get: function (request, response) {
        console.log(request.isAuthenticated());
        response.json(request.user.toObject());
    },
    update: function (request, response) {
        request.user.set(request.body);
        request.user.save(function (error, user) {
            response.json(user.toObject());
        });
    }
};