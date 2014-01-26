var express = require('express');

module.exports = {
    newApplication: function (configuration) {
        var app = express();

        if (configuration) {
            app.configure(function () {
                if (configuration.name) {
                    app.set('name', configuration.name);
                }
                if (configuration.views) {
                    app.set('views', configuration.views);
                }
                if (configuration.viewEngine) {
                    app.set('view engine', configuration.viewEngine);
                }
                if (configuration.bodyParser) {
                    app.use(express.bodyParser());
                }
                if (configuration.methodOverride) {
                    app.use(express.methodOverride());
                }
                if (configuration.router) {
                    app.use(app.router);
                }
            });
        }

        return app;
    }
};