var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    crypto = require('crypto'),
    config = require('../../../../config/config'),
    mongoose = require('mongoose'),
    // create OAuth 2.0 server
    server = oauth2orize.createServer();

console.log('auth module index.js');
console.log(config);

// Exchange email & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, email, password, scope, done) {

    console.log('oauth2orize.exchange.password', arguments);

    var User = mongoose.model('User'),
        AccessToken = mongoose.model('AccessToken'),
        RefreshToken = mongoose.model('RefreshToken');

    User.findOne({ email: email }, function (err, user) {

        var tokenValue,
            refreshTokenValue,
            token,
            refreshToken,
            info = { scope: '*' };

        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        if (!user.authenticate(password)) {
            return done(null, false);
        }

        RefreshToken.remove({ userId: user._id, clientId: client.clientId }, function (err) {
            if (err) {
                return done(err);
            }
        });

        AccessToken.remove({ userId: user._id, clientId: client.clientId }, function (err) {
            if (err) {
                return done(err);
            }
        });

        tokenValue = crypto.randomBytes(32).toString('base64');
        refreshTokenValue = crypto.randomBytes(32).toString('base64');
        token = new AccessToken({
            token: tokenValue,
            clientId: client.clientId,
            userId: user._id
        });
        refreshToken = new RefreshToken({
            token: refreshTokenValue,
            clientId: client.clientId,
            userId: user._id
        });

        refreshToken.save(function (err) {
            if (err) {
                return done(err);
            }
        });


        token.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, tokenValue, refreshTokenValue, {
                'expires_in': config.security.tokenLife
            });
        });
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

    console.log('oauth2orize.exchange.refreshToken');

    var User = mongoose.model('User'),
        AccessToken = mongoose.model('AccessToken'),
        RefreshToken = mongoose.model('RefreshToken');

    RefreshToken.findOne({ token: refreshToken }, function (err, token) {

        if (err) {
            return done(err);
        }

        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function (err, user) {

            var tokenValue,
                refreshTokenValue,
                token,
                refreshToken,
                info = { scope: '*' };

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            RefreshToken.remove({ userId: user._id, clientId: client.clientId }, function (err) {
                if (err) {
                    return done(err);
                }
            });

            AccessToken.remove({ userId: user._id, clientId: client.clientId }, function (err) {
                if (err) {
                    return done(err);
                }
            });

            tokenValue = crypto.randomBytes(32).toString('base64');
            refreshTokenValue = crypto.randomBytes(32).toString('base64');
            token = new AccessToken({
                token: tokenValue,
                clientId: client.clientId,
                userId: user._id
            });
            refreshToken = new RefreshToken({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user._id
            });

            refreshToken.save(function (err) {
                if (err) {
                    return done(err);
                }
            });

            token.save(function (err, token) {
                if (err) {
                    return done(err);
                }
                done(null, tokenValue, refreshTokenValue, {
                    'expires_in': config.security.tokenLife
                });
            });
        });
    });
}));

// token endpoint
module.exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
]