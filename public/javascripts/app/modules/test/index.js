define('Test', function () {
    return {
        mountToApp: function (Application) {
            console.log('starting Test module');
        }
    };
});

Application.modules.push('Test');