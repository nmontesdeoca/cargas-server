var User = require('mongoose').model('User');

module.exports = {
    showSignupform: function (request, response) {
        response.render('signup', { title: 'Registrarme' });
    },
    create: function (request, response) {
        var user = new User(request.body);
        user.provider = 'local';
        user.save(function (err) {
            if (err) {
                response.redirect('/signup');
                /*return response.render('users/signup', {
                    // errors: utils.errors(err.errors),
                    user: user,
                    title: 'Registrarme'
                });*/
            }

            /**
             * manually login the user once successfully signed up
             */
            request.logIn(user, function (err) {
                if (err) {
                    return next.apply(this, [err]);
                }
                return response.redirect('/refuels');
            });
        });
    },
    showLoginForm: function (request, response) {
        response.render('login', { title: 'Entrar' });
    },
    login: function (request, response) {
        module.exports.authCallback(request, response);
    },
    signin: function (request, response) {},
    authCallback: function (request, response) {
        if (request.session.returnTo) {
            response.redirect(request.session.returnTo);
            delete request.session.returnTo;
            return;
        }
        response.redirect('/');
    },
    showAccountForm: function (request, response) {},
    saveAccount: function (request, response) {},
    logout: function (request, response) {}
};