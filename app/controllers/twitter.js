var hostname = 'api.twitter.com',
    querystring = require('querystring'),
    https = require('https');

exports.requestToken = function * () {

    var post_request = https.request({
        hostname: hostname,
        path: '/oauth/request_token',
        method: 'POST'
    }, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    post_request.write(
        querystring.stringify({
            'oauth_callback': 'http://localhost:3000/auth/twitter/callback'
        })
    );
    post_request.end();

    yield [];
};

exports.requestTokenCallback = function * () {
    console.log(this);
    yield [];
    this.body = 'yes';
};