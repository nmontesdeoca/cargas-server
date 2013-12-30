define('User', function () {
    return {
        mountToApp: function (Application) {
            console.log('starting User module');
        }
    };
});

Application.modules.push('User');define('Test', function () {
    return {
        mountToApp: function (Application) {
            console.log('starting Test module');
        }
    };
});

Application.modules.push('Test');