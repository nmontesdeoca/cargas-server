var twitter = require('../../app/controllers/twitter');

module.exports = function (app, route) {
    app.use(route.get('/auth/twitter', twitter.requestToken));

    app.use(route.get('/auth/twitter/callback', twitter.requestTokenCallback));
};