var express = require('express'),
    app = module.exports = express(),
    utils = require('../lib/utils'),
    domain,
    config;

/**
 * configure the express application and connect to database
 */
require('../config/express')(app, express);

/**
 * require all modules into the application
 */
utils.requireModules(__dirname + '/modules', app);

/**
 * bootstrap passport configuration
 */
domain = app.get('domain');
config = {
    facebook: { callbackURL: domain + '/api/auth/facebook/callback' },
    twitter: { callbackURL: domain + '/api/auth/twitter/callback' },
    google: { callbackURL: domain + '/api/auth/google/callback' }
};
if (process.env.CONFIGURED) {
    config.facebook.clientID = process.env.FACEBOOK_CLIENT_ID;
    config.facebook.clientSecret = process.env.FACEBOOK_CLIENT_SECRET;

    config.twitter.clientID = process.env.TWITTER_CLIENT_ID;
    config.twitter.clientSecret = process.env.TWITTER_CLIENT_SECRET;

    config.google.clientID = process.env.GOOGLE_CLIENT_ID;
    config.google.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
} else {
    config = require('../config/config')(config);
}
require('../config/passport')(require('passport'), config);

/*
app.get('/fuels', function (request, response) {

    var mongoose = require('mongoose'),
        Fuel = mongoose.model('Fuel');

    new Fuel({
        name: 'Premium 97 SP',
        cost: 42.10
    }).save();

    new Fuel({
        name: 'Gasoil',
        cost: 38.70
    }).save();

    new Fuel({
        name: 'Super 95 SP',
        cost: 40.60
    }).save();

    response.send('Combustibles actualizados');
});
*/

/**
 * in order to get the one page application working well,
 * we need to redirect all the pages not found
 * to the homepage to give the angular js app the ability to route these urls
 */
app.use(function (request, response, next) {
    response.sendfile(__dirname + '/views/index.html');
});

