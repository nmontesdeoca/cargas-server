var Refuel = require('mongoose').model('Refuel');

exports.list = function (request, response) {
    Refuel.find({ user: request.user._id }, function (error, refuels) {
        if (error) {
            return response.json({
                error: error
            });
        }        
        response.render('refuel/list', {
            title: 'Mis recargas',
            refuels: refuels
        });
    });
};

exports.create = function (request, response) {
    var refuel;

    if (request.method === 'GET') {
        response.render('refuel/create', { title: 'Ingresa una recarga' });
    } else if (request.method === 'POST') {
        refuel = new Refuel();

        refuel.set({
            cost: request.body.cost,
            capacity: request.body.capacity,
            kilometers: request.body.kilometers,
            user: request.user._id
        });

        refuel.save(function (error) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }
            response.redirect('/refuels');
        });
    }
};