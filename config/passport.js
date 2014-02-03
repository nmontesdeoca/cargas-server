var mongoose = require('mongoose'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = mongoose.model('User');

module.exports = function (passport) {

    passport.use(
        new BasicStrategy({}, function (email, password, done) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, user);
            })
        })
    );
};