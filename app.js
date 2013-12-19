var express = require('express'),
    fs = require('fs'),
    app = express(),
    http = require('http'),
    path = require('path'),
    routes,
    config = require('./config'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    models_path = __dirname + '/models',
    ejs_filters_path = __dirname + '/views/filters',
    
    GoogleStrategy = require('passport-google').Strategy,
    User,
    
    ensureAuthorization = function (request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        }
        return response.redirect('/login');
    },

    requireJSFile = function (path, file) {
        if (~file.indexOf('.js')) {
            require(path + '/' + file);
        }
    },

    requirePath = function (path) {
        fs.readdirSync(path).forEach(requireJSFile.bind(requireJSFile, path));
    };

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
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: __dirname + '/public' }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('db', process.env.db || config.db[app.get('env')]);
    app.set('domain', process.env.domain || config.domain);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// bootstrap models
requirePath(models_path);

// bootstrap ejs filters
requirePath(ejs_filters_path);

// bootstrap db connection
mongoose.connect(app.get('db'));
mongoose.connection.on('error', console.error.bind(console, 'DB CONNECTION ERROR'));
mongoose.connection.once('open', console.log.bind(console, 'DB CONNECTION OK'));

routes = {
    index: require('./routes'),
    user: require('./routes/user'),
    refuel: require('./routes/refuel')
};

User = mongoose.model('User');

passport.serializeUser(User.serialize.bind(User));
passport.deserializeUser(User.deserialize.bind(User));

passport.use(new GoogleStrategy({
    returnURL: app.get('domain') + 'auth/google/return',
    realm: app.get('domain')
},
function(identifier, profile, done) {
    process.nextTick(function () {
        User.findOne({ email: profile.emails[0].value }, function (error, user) {
            var newUser;
            if (!user) {
                newUser = new User();
                newUser.set({
                    email: profile.emails[0].value,
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName
                });
                
                newUser.save(function (error) {
                    return User.deserialize(profile.emails[0].value, done);
                });
            } else {
                return User.deserialize(profile.emails[0].value, done);
            }
        });
    });
}));

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/refuels',
    failureRedirect: '/login'
}));

app.get('/', routes.index.index);
app.get('/login', routes.user.login);
app.get('/logout', routes.user.logout);
app.get('/refuels', ensureAuthorization, routes.refuel.list);
app.all('/refuels/create', ensureAuthorization, routes.refuel.create);

/*
// Only to create or set the fuel prices
app.get('/fuels', function (request, response) {
    var Fuel = mongoose.model('Fuel'),
        premium = new Fuel(),
        gasoil = new Fuel(),
        super95 = new Fuel();

    premium.set({
        name: 'Premium 97 SP',
        cost: 42.10
    });
    premium.save();

    gasoil.set({
        name: 'Gasoil',
        cost: 38.70
    });
    gasoil.save();

    super95.set({
        name: 'Super 95 SP',
        cost: 40.60
    });
    super95.save();

    response.send('Combustibles actualizados');
});
*/

http.createServer(app).listen(app.get('port'), function () {
    console.log('try the application from: http://localhost:3000');
});