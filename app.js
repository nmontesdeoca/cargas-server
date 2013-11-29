var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    models_path = __dirname + '/models',
    fs = require('fs'),
    mongoose = require('mongoose'),
    config = require('./config.js');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('car_gas_secret_key'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Bootstrap db connection
console.log(config);
// mongoose.connect(config.db);

// Bootstrap models
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file)
    }
});

var routes = require('./routes');
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});