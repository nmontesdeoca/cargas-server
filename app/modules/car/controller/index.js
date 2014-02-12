var Car = require('mongoose').model('Car');

module.exports = {
    list: function (request, response) {
        Car.find(function (error, cars) {
            response.json(cars);
        });
    },
    create: function (request, response) {
        new Car(request.body).save(function (error, car) {
            response.json(car);
        });
    },
    get: function (request, response) {
        Car.findOne({ _id: request.params.id }, function (error, car) {
            response.json(car);
        });
    },
    delete: function (request, response) {
        Car.findByIdAndRemove(request.params.id, function (error, car) {
            response.json(car);
        });
    }
};