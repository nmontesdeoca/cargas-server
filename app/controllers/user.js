exports.login = function (request, response) {
    response.render('user/login', { title: 'Entrar' });
};

exports.logout = function (request, response) {
    request.logout();
    response.redirect('/login');
};