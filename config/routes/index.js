var route = require('koa-route'),
    index = require('../../app/controllers');

module.exports = function (app) {
    app.use(route.get('/', index.index));

    /**
     * configure user routes
     */
    require('./user')(app, route);

    /**
     * configure twitter auth routes
     */
    require('./twitter')(app, route);

    /**
     * configure refuel routes
     */
    require('./refuel')(app, route);
};