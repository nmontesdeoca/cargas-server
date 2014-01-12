var Refuel = require('mongoose').model('Refuel');

module.exports = {
    list: function (request, response) {
        Refuel
            .find({ user: request.user._id })
            .sort({ date: 'desc' })
            .exec(function (error, refuels) {
                response.render('list', { title: 'Mis recargas', refuels: refuels });
            });
    },
    form: function (request, response) {
        if (request.params.id) {
            Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
                response.render('form', { title: 'Editar', refuel: refuel });
            });
        } else {
            response.render('form', { title: 'Agregar', refuel: null });
        }
    },
    create: function (request, response) {
        request.body.user = request.user._id;

        new Refuel(request.body).save();

        response.redirect('/refuels');
    },
    edit: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {

            /**
             * si no le agrego el 23 hs me puede quedar
             * como una fecha de ayer por el timezone
             */
            request.body.date += ' 23:00:00';
            refuel.set(request.body);
            refuel.save();

            response.redirect('/refuels');
        });

    },
    delete: function (request, response) {
        Refuel.findByIdAndRemove(request.params.id, function (error, refuel) {
            response.redirect('/refuels');
        });
    }
};