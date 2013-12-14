var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    app = express(),
    models_path = __dirname + '/models',
    ejs_filters_path = __dirname + '/views/filters',
    routes;

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('car_gas_secret_key'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('db', process.env.db || require('./config').db[app.get('env')])
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// bootstrap models
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file)
    }
});

// bootstrap ejs filters
fs.readdirSync(ejs_filters_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(ejs_filters_path + '/' + file)
    }
});

// bootstrap db connection
mongoose.connect(app.get('db'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback () {
    console.log('connection database successfully');
});

routes = {
    index: require('./routes'),
    user: require('./routes/user'),
    refuel: require('./routes/refuel')
};

var authorization = function (request, response, next) {
    if (request.session.user_id) {
        next.apply(this);
    } else {
        response.redirect('/login');
    }
};

app.get('/', routes.index.index);

app.all('/login', routes.user.login);
app.get('/refuels', authorization, routes.refuel.list);
app.all('/refuels/create', authorization, routes.refuel.create);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});