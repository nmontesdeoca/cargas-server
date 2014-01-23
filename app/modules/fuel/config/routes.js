var controller = require('../controller'),
    // mongoose = require('mongoose'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/api/fuel', authorization.requiresLogin, controller.list);
    app.post('/api/fuel', authorization.requiresLogin, controller.create);
    app.get('/api/fuel/:id', authorization.requiresLogin, controller.get);
    app.delete('/api/fuel/:id', authorization.requiresLogin, controller.delete);

    /*
    insert fuels
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
};