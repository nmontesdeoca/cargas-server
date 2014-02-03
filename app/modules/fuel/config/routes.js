var controller = require('../controller'),
    authorization = require('../../../middlewares/authorization');

module.exports = function (app) {
    app.get('/fuel', authorization.requiresLogin, controller.list);
    app.post('/fuel', authorization.requiresLogin, controller.create);
    app.get('/fuel/:id', authorization.requiresLogin, controller.get);
    app.delete('/fuel/:id', authorization.requiresLogin, controller.delete);

    /*
    app.get('/fuels', function (request, response) {

        var mongoose = require('mongoose'),
            Fuel = mongoose.model('Fuel');

        new Fuel({
            name: 'Premium 97 SP',
            cost: 42.10
        }).save();

        new Fuel({
            name: 'Gasoil',
            cost: 38.70
        }).save();

        new Fuel({
            name: 'Super 95 SP',
            cost: 40.60
        }).save();

        response.send('Combustibles actualizados');
    });
    */
};