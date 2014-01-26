var mongoose = require('mongoose'),
    passport = require('passport');

module.exports = function (app, express) {
    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('db', process.env.DB || require('./database').db);
        app.set('domain', process.env.DOMAIN || ('http://localhost:' + app.get('port')));
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('car_gas_secret_here'));
        app.use(express.session({ cookie: { maxAge: (24 * 60 * 60 * 1000) } }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(app.router);
        app.use(express.static(__dirname + '/../../client'));
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    /**
     * connecting to database
     */
    mongoose.connect(app.get('db'));
};