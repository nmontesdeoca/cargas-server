module.exports = {
    home: function (request, response) {
        response.render('home', { title: 'pagina principal' });
    }
};