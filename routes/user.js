var User = require('mongoose').model('User');

exports.login = function (request, response) {
    var data = request.body,
        method = request.method;

    if (method === 'GET') {
        response.render('user/login', { title: 'Entrar' });
    } else if (method === 'POST' && data) {
        if (!(data.email && data.password)) {
            data.error = 'error, falta email and/or password';
            return response.json(data);
        }

        User.findOne({ email: data.email }, 'password salt', function (error, user) {
            if (error) {
                return response.json({
                    error: error
                });
            } else if (!user) {
                return response.json({
                    error: 'ese usuario no existe'
                });
            }

            User.encryptPassword(data.password, user.get('salt'), function (error, password) {
                if (error) {
                    return response.json({
                        error: error
                    });
                } else if (password !== user.get('password')) {
                    return response.json({
                        error: 'esta mal la password'
                    });
                } else {
                    request.session.user_id = user.get('_id');
                    // 30 days
                    request.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
                    response.redirect('/');
                }
                
            });
        });
    }
};

exports.logout = function (request, response) {
    delete request.session.user_id;
    response.redirect('/');
};