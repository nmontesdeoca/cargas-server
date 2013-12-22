var views = require('co-views'),
    render = views(__dirname + '/../views', { ext: 'ejs' });

exports.login = function * () {
    this.body = yield render('user/login', { title: 'Entrar' });
};

exports.logout = function * () {
    // TODO: implement
    yield [];
};