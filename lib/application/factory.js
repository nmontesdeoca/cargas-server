var express = require('express');

module.exports = {
    newApplication: function (configure) {
        var app = express();

        configure(app, express);

        return app;
    }
};