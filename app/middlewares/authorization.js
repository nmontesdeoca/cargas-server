/**
 * middleware to check if the user has the right acces
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