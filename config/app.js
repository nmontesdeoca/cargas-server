console.log('environment db');
console.log(process.env.db);
exports.db = process.env.db || require('./database').db;