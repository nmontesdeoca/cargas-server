var passport = require('passport');

/**
 * middleware to check if the user has the right access
 * @param  {Object}   request  express request
 * @param  {Object}   response express response
 * @param  {Function} next     express next function
 * @return {void}              if the check fails, send status 401 Not Authorized
 */
exports.requiresLogin = function (request, response, next) {
    if (!request.isAuthenticated()) {
        return response.send(401);
    }
    next.apply(this);
};

/**
 * middleware to login local users (stored in our db)
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 * @return {void}
 */
exports.localLogin = function (request, response, next) {
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            return next(error);
        }
        if (!user) {
            return response.send({
                errorMessage: info.message
            });
        }
        request.logIn(user, function (error) {
            if (error) {
                return next(error);
            }
            return response.send({
                user: user.toObject()
            });
        });
    })(request, response, next);
};
