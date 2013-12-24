module.exports = function (app) {
    return {
        facebook: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: app.get('domain') + '/auth/facebook/callback'
        },
        twitter: {
            clientID: 'CONSUMER_KEY',
            clientSecret: 'CONSUMER_SECRET',
            callbackURL: app.get('domain') + '/auth/twitter/callback'
        },
        google: {
            clientID: 'APP_ID',
            clientSecret: 'APP_SECRET',
            callbackURL: app.get('domain') + '/auth/google/callback'
        }
    };
};