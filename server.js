var app = module.exports = require('./app');

app.listen(app.get('port'));
console.log('listening on port %d', app.get('port'));
