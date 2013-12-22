var refuel = require('../../app/controllers/refuel');

module.exports = function (app, route) {
    app.use(route.get('/refuels', refuel.list));
    app.use(route.get('/refuels/create', refuel.create));
    app.use(route.post('/refuels/create', refuel.create));
};
