var controller = require('../controller'),
    passport = require('passport'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.post('/api/user', controller.create);
    app.get('/api/user', authorization.requiresLogin, controller.get);
    app.post('/api/user/:id', authorization.requiresLogin, controller.update);
    app.post('/api/login', authorization.localLogin);
    app.get('/api/logout', authorization.requiresLogin, controller.logout);
    app.get('/api/loggedin', controller.loggedin);

    app.get('/api/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me']
    }));
    app.get('/api/auth/facebook/callback', passport.authenticate('facebook'));

    app.get('/api/auth/twitter', passport.authenticate('twitter'));
    app.get('/api/auth/twitter/callback', passport.authenticate('twitter'));

    app.get('/api/auth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    app.get('/api/auth/google/callback', passport.authenticate('google'));
};