var Fuel = require('mongoose').model('Fuel');

module.exports = {
    list: function (request, response) {
        Fuel.find(function (error, fuels) {
            response.json(fuels);
        });
    },
    create: function (request, response) {
        new Fuel(request.body).save(function (error, fuel) {
            response.json(fuel);
        });
    },
    get: function (request, response) {
        Fuel.findOne({ _id: request.params.id }, function (error, fuel) {
            response.json(fuel);
        });
    },
    delete: function (request, response) {
        Fuel.findByIdAndRemove(request.params.id, function (error, fuel) {
            response.json(fuel);
        });
    }
};