var Refuel = require('mongoose').model('Refuel');

module.exports = {
    list: function (request, response) {
        Refuel.find({ user: request.user._id }, function (error, refuels) {
            response.render('list', { title: 'Mis recargas', refuels: refuels });
        });
    },
    form: function (request, response) {},
    create: function (request, response) {},
    edit: function (request, response) {},
    delete: function (request, response) {}
};