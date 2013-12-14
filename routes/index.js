exports.index = function (request, response) {
    var data = {
        title: 'mi sitio',
        user: ''
    };
    
    if (request.session.user_id) {
        data.user = request.session.user_id;
        // response.redirect('/refuels');
        // response.render('index', data);
    } else {
        response.redirect('/login');
    }
};

/*
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Refuel = mongoose.model('Refuel');

exports.user = {
    create: function (request, response) {
        console.log('create!');
        var user = new User();
        user.set({
            name: request.body.name,
            email: request.body.email,
            access_token: User.makeToken(),                        
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

                        // TODO: remove redirect, assign an access token and that's all
                        response.redirect('/refuels');
                    });
                }
            }
        });
    },
    get: function (request, response) {
        User.findOne({ _id: request.params.id }, 'email name created_at updated_at', function (error, result) {
            if (error) {
                console.error(error);
                response.json({
                    success: false,
                    error: error
                });
                return;
            }

            response.json({
                success: true,
                result: result
            });
        });
    },
    edit: function (request, response) {
        // 501 not implemented
        response.json(501, {});
    },
    delete: function (request, response) {
        // 501 not implemented
        response.json(501, {});
    },
    login: function (request, response) {
        // check that there is an user with the email and password from the request body
        // if there is an user, check if the user has an access_token
        // if has an access_token, retrieve it, if not, create it (store it) and retrieve it
        // if there is not an user with this data, retrieve an error "user or password are incorrect"
        User.findOne({ email: request.body.email }, 'salt password access_token', function (error, user) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }

            User.encryptPassword(request.body.password, user.get('salt'), function (error, password) {
                
                if (password === user.password) {
                    response.json({
                        success: true,
                        access_token: user.get('access_token')
                    });
                } else {
                    response.json({
                        success: true,
                        login: false
                    });
                }
                
            });
        });
    }
};
exports.refuel = {
    list: function (request, response) {
        Refuel.find(function (error, result) {
            if (error) {
                console.error(error);
                response.json({
                    success: false,
                    error: error
                });
                return;
            }

            response.json({
                success: true,
                result: result
            });
        });
    },
    create: function (request, response) {
        var refuel = new Refuel();

        refuel.set({
            cost: request.body.cost,
            capacity: request.body.capacity,
            kilometers: request.body.kilometers,
            user: request.body.user
        });

        refuel.save(function (error) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }
            response.json({
                success: true,
                refuel: refuel
            });

        });
    },
    get: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }
            response.json({
                success: true,
                refuel: refuel
            });
        });
    },
    edit: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }

            refuel.set({
                cost: request.body.cost || refuel.get('cost'),
                capacity: request.body.capacity || refuel.get('capacity'),
                kilometers: request.body.kilometers || refuel.get('kilometers')
            });

            refuel.save(function (error) {
                if (error) {
                    response.json({
                        success: false,
                        error: error
                    });
                    return;
                }
                response.json({
                    success: true,
                    refuel: refuel
                });

            });
        });
    },
    delete: function (request, response) {
        Refuel.findOne({ _id: request.params.id }, function (error, refuel) {
            if (error) {
                response.json({
                    success: false,
                    error: error
                });
                return;
            }

            refuel.remove(function (error) {
                if (error) {
                    response.json({
                        success: false,
                        error: error
                    });
                    return;
                }
                response.json({
                    success: true
                });

            });
        });
    }
};
*/