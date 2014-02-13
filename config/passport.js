var config = require('./config'),
    mongoose = require('mongoose'),
    messages = require('./messages'),
    BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    Client = mongoose.model('Client'),
    AccessToken = mongoose.model('AccessToken'),
    RefreshToken = mongoose.model('RefreshToken'),
    User = mongoose.model('User');

module.exports = function (passport) {
    passport.use(new BasicStrategy(
        function (email, password, done) {

            console.log('BasicStrategy', email, password);

            Client.findOne({ clientId: email }, function (err, client) {
                if (err) {
                    return done(err);
                }

                if (!client) {
                    return done(null, false);
                }

                if (client.clientSecret != password) {
                    return done(null, false);
                }

                console.log('BasicStrategy OK');

                return done(null, client);
            });
        }
    ));

    passport.use(new ClientPasswordStrategy(
        function (clientId, clientSecret, done) {

            console.log('ClientPasswordStrategy', clientId, clientSecret);

            Client.findOne({ clientId: clientId }, function (err, client) {
                if (err) {
                    return done(err);
                }

                if (!client) {
                    return done(null, false);
                }

                if (client.clientSecret != clientSecret) {
                    return done(null, false);
                }

                return done(null, client);
            });
        }
    ));

    passport.use(new BearerStrategy(
        function (accessToken, done) {

            console.log('BearerStrategy', accessToken);

            AccessToken.findOne({ token: accessToken }, function (err, token) {
                console.log(arguments);
                if (err) {
                    return done(err);
                }

                if (!token) {
                    return done(null, false);
                }

                if (Math.round((Date.now() - token.createdAt) / 1000) > config.security.tokenLife) {
                    AccessToken.remove({ token: accessToken }, function (err) {
                        if (err) {
                            return done(err);
                        }
                    });
                    return done(null, false, { message: 'Token expired' });
                }

                User.findById(token.userId, function (err, user) {
                    var info = { scope: '*' };

                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done(null, false, { message: 'Unknown user' });
                    }

                    done(null, user, info);
                });
            });
        }
    ));
};