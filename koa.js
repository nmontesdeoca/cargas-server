var koa = require('koa'),
    app = koa(),
    mount = require('koa-mount');

// x-response-time
app.use(require('koa-response-time')());

// logger
app.use(require('koa-logger')());

// static files
app.use(require('koa-static')(__dirname + '/public'));

// require test modules
app.use(mount(require('./modules/testnico')));

// server start listening
app.listen(3000);
console.log('listening on port 3000');

/**
 * EXAMPLES
 *
// response
app.use(route.get('/', function * () {
    this.body = yield render('user/login', { title: 'Hello World' });
}));

// body parsing
app.use(function * (next) {
    if ('POST' !== this.method) {
        return yield next;
    }
    var body = yield parse(this, { limit: '1kb' });
    if (!body.name) {
        this.throw(400, '.name required');
    }
    this.body = { name: body.name.toUpperCase() };
});

*/