var mongoose = require('mongoose');

module.exports = function (app, express) {
    app.configure(function () {
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/../app/views');
        app.set('view engine', 'ejs');
        app.set('db', process.env.DB || require('./database').db);
        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.cookieParser('car_gas_secret_here'));
        app.use(express.session());
        app.use(app.router);
        app.use(express.static(__dirname + '/../public'));
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    /**
     * connecting to database
     */
    mongoose.connect(app.get('db'));
};