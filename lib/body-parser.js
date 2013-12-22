var parse = require('co-body');

module.exports = function () {
    return function * (next) {
        if (this.method === 'POST') {
            this.request.body = yield parse(this);
        }
        return yield next;
    };
};
