var route = require('koa-route'),
    controllers = require('');

module.exports = function (app) {

    app.use(route.get('/', function * () {
        this.body = yield render('user/login', { title: 'title yeh jaja'});
    }));

};
/*

routes = {
    index: require('./routes'),
    user: require('./routes/user'),
    refuel: require('./routes/refuel')
};

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