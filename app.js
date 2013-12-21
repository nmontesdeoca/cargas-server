var express = require('express'),
    fs = require('fs'),
    app = express(),
    utils = require('./lib/utils'),
    mongoose = require('mongoose'),
    passport = require('passport');


/**
 * configure application
 */
require('./config/express')(app, express, passport);

/**
 * configure passport
 */
require('./config/passport')(passport);

/**
 * bootstrap models
 */
utils.requirePath(__dirname + '/models');

/**
 * bootstrap ejs filters
 */
utils.requirePath(__dirname + '/views/filters');

/**
 * bootstrap db connection
 */
mongoose.connect(app.get('db'));
mongoose.connection.on('error', console.error.bind(console, 'db connection error'));
mongoose.connection.once('open', console.log.bind(console, 'db connection ok'));



app.listen(app.get('port'));
console.log('try the application from: http://localhost:3000');