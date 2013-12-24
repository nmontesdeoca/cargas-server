module.exports = {
    home: function (request, response) {
        /**
         * por ahora no me interesa que haya una home page, asi que redirijo a la pagina de refuels
         * que me parece mas productivo para un usuario, para ya ponerse a ingresar los datos
         */
        response.redirect('/refuel');
    }
};