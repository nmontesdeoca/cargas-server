var Refuel = require('mongoose').model('Refuel');

module.exports = {
    list: function (request, response) {
        Refuel.find({ user: request.user._id }, function (error, refuels) {
            response.json(refuels);
        });
    },
    create: function (request, response) {
        request.body.user = request.user._id;

        new Refuel(request.body).save(function (error, refuel) {
            response.json(refuel);
        });
    },
    get: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
            response.json(refuel);
        });
    },
    update: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
            refuel.set(request.body);
            refuel.save(function (error, refuel) {
                response.json(refuel);
            });
        });
    },
    delete: function (request, response) {
        Refuel.findByIdAndRemove(request.params.id, function (error, refuel) {
            response.json(refuel);
        });
    }
};