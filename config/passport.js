var mongoose = require('mongoose'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User = mongoose.model('User');

module.exports = function (passport) {
  // serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    // use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: 'KeaH3SUvtDTZQLDAmJRJRA',
            consumerSecret: 'DCN8a2vpMGXp1uvxPFWTRWR3YlKF8REPVR6zyLy5Vg',
            callbackURL: '/auth/twitter/callback'
        },
        function (token, tokenSecret, profile, done) {
            User.findOne({ 'twitter.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        provider: 'twitter',
                        twitter: profile._json
                    });
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
};