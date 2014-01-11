module.exports = {
    home: function (request, response) {
        response.render('home', { title: 'pagina principal', APP_ID: process.env.FACEBOOK_CLIENT_ID });
    }
};