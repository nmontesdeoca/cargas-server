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
                password = password.toString();
                console.log('password');
                console.log(password.toString());
                console.log('user.get(password)');
                console.log(user.get('password'));
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

exports.register = function (request, response) {
    var user = new User();
    user.set({
        name: request.body.name,
        email: request.body.email,                     
        _password: {
            password: request.body.password,
            callback: function (error, password) {
                user.set('password', password);
                user.save(function (error) {
                    if (error) {
                        console.error(error);
                        response.json({
                            success: false,
                            error: error
                        });
                        return;
                    }
                    response.redirect('/login');
                });
            }
        }
    });
};

exports.logout = function (request, response) {
    delete request.session.user_id;
    response.redirect('/');
};