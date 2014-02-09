var mongoose = require('mongoose'),
    messages = require('./messages'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = mongoose.model('User');

module.exports = function (passport) {

    passport.use(
        new BasicStrategy({}, function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                } else if (!user || !user.authenticate(password)) {
                    return done(null, false, { message: messages.invalidEmailOrPassword });
                }
                return done(null, user);
            })
        })
    );

};