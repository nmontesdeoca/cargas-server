/**
 * middleware to check if the user has the right acces
 * @param  {Object}   request  express request
 * @param  {Object}   response express response
 * @param  {Function} next     express next function
 * @return {void}              if the check fails, the user is redirected to /login
 *                             else the users goes to the page wanted
 */
exports.requiresLogin = function (request, response, next) {
    if (!request.isAuthenticated()) {
        // request.session.returnTo = request.originalUrl;
        // return response.redirect('/login');
        return response.send(401);
    }
    next.apply(this);
};