var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.index = function (req, res) {
    var user = new User();

    user.set('name', 'Nicolas Montesdeoca');
    user.set('_password', ['hcfg76yu', function (error, password) {
        user.set('password', password);
        user.save();
    }]);
    
    res.send('hola jaja')
};