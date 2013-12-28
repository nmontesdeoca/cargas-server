module.exports = {
    home: function (request, response) {
        /**
         * por ahora no me interesa que haya una home page, asi que redirijo a la pagina de refuels
         * que me parece mas productivo para un usuario, para ya ponerse a ingresar los datos
         */
        response.redirect('/refuels');
    },
    beta: function (request, response) {
        require('mongoose').model('Refuel').find({ user: request.user._id }, function (error, refuels) {
            response.render('beta', { title: 'beta', refuels: refuels });
        });
    }
};