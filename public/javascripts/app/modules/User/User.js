define('User', function () {
    return {
        mountToApp: function (Application) {
            console.log('starting User module');
        }
    };
});

Application.modules.push('User');