var parse = require('co-body');

module.exports = function () {
    return function * (next) {
        if ('POST' === this.method) {
            this.request.body = yield parse(this);
        }
        return yield next;
    };
};
