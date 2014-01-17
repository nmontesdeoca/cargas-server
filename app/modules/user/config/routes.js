var controller = require('../controller'),
    passport = require('passport'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/signup', controller.showSignupform);
    app.post('/signup', controller.create);

    app.get('/login', controller.showLoginForm);
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), controller.login);

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/login'
    }), controller.signin);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), controller.authCallback);

    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/login'
    }), controller.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        callbackUrl: 'oob',
        failureRedirect: '/login'
    }), controller.authCallback);

    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/login',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), controller.signin);
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }), controller.authCallback);

    app.get('/account', authorization.requiresLogin, controller.showAccountForm);
    app.put('/account', authorization.requiresLogin, controller.saveAccount);

    app.get('/logout', authorization.requiresLogin, controller.logout);

    app.get('/loggedin', controller.loggedin);
};