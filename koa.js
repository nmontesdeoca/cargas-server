var koa = require('koa'),
    app = koa(),
    views = require('co-views'),
    logger = require('koa-logger'),
    route = require('koa-route'),
    render = views(__dirname + '/views', { ext: 'ejs' }),
    serve = require('koa-static'),
    passport = require('passport');

// x-response-time
app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger
app.use(logger());

// response
app.use(route.get('/', function *() {
    this.body = yield render('user/login', { title: 'Hello World' });
}));

// body parsing
app.use(function *(next){
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, { limit: '1kb' });
  if (!body.name) this.throw(400, '.name required');
  this.body = { name: body.name.toUpperCase() };
});

app.use(serve(__dirname + '/public'));

app.use(function *(next) {
    passport.initialize();
    passport.session();
    yield next;
});

app.listen(3000);