/**
 * middleware to check if the user has the right access
 */
exports.requiresLogin = require('passport').authenticate('basic', { session: false });

exports.loginMiddleware = function (request, response, next) {
    require('passport').authenticate('basic', { session: false }, function (error, user, info) {
        if (error) {
            return next(error);
        }
        if (!user) {
            return response.json({
                authenticated: false,
                errorMessage: info.message
            });
        }
        response.json({
            authenticated: true
        });
        return next();
    })(request, response, next);
};
