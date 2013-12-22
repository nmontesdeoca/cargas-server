var Refuel = require('mongoose').model('Refuel'),
    views = require('co-views'),
    render = views(__dirname + '/../views', { ext: 'ejs' });

/**
 * render all the refuels for the user logged in
 * @type {Generator}
 */
exports.list = function * () {
    this.body = yield render('refuel/list', {
        title: 'Mis recargas',
        refuels: yield Refuel.find({
            user: '52b251c65308e4862a000001'
        }).exec()
    });
};

/**
 * if the request method is GET, render the form
 * if the request method is POST, create a new Refuel with the body parameters as data
 * @type {Generator}
 */
exports.create = function * () {
    var refuel;

    if (this.method === 'GET') {
        this.body = yield render('refuel/create', { title: 'Ingresa una recarga' });
    } else if (this.method === 'POST') {
        refuel = new Refuel();

        refuel.set({
            cost: this.request.body.cost,
            capacity: this.request.body.capacity,
            kilometers: this.request.body.kilometers,
            user: '52b251c65308e4862a000001'
        });

        refuel.save();
        this.redirect('/refuels');
    }
};