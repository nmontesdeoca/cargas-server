module.exports = function (config) {
    config.facebook.clientID = 'APP_ID';
    config.facebook.clientSecret = 'APP_SECRET';

    config.twitter.clientID = 'APP_ID';
    config.twitter.clientSecret = 'APP_SECRET';

    config.google.clientID = 'APP_ID';
    config.google.clientSecret = 'APP_SECRET';

    return config;
};