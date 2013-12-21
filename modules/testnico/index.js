var koa = require('koa'),
    app = module.exports = koa(),
    render = require('co-views')(__dirname + '/views', { ext: 'ejs' }),
    route = require('koa-route');

app.use(route.get('/', function * () {
    this.body = yield render('index', { title : 'mi new title pelao' });
}));