var Refuel = require('mongoose').model('Refuel');

module.exports = {
    list: function (request, response) {
        Refuel.find({ user: request.user._id }, function (error, refuels) {
            response.render('list', { title: 'Mis recargas', refuels: refuels });
        });
    },
    form: function (request, response) {
        response.render('form', { title: 'Agregar' });
    },
    create: function (request, response) {
        request.body.user = request.user._id;
        new Refuel(request.body).save();
        
        response.redirect('/refuels');
    },
    edit: function (request, response) {},
    delete: function (request, response) {}
};