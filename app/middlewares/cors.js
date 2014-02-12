module.exports = function (request, response, next) {

    response.set({
        'Access-Control-Allow-Origin': '*'
    });

    if (request.method === 'OPTIONS') {
        response.set({
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        });
        response.send(200);
    } else {
        next.apply(this);
    }

};