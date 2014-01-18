angular.module('Providers')
.provider('$util', function () {
    this.$get = {};

    this.checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            if (user !== '0') {
                deferred.resolve();
            } else {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred;
    };

    this.interceptor = function ($q, $location) {
        return function (promise) {
            return promise.then(
                function (response) {
                    return response;
                },
                function (response) {
                    if (response.status === 401) {
                        $location.url('/login');
                        return $q.reject(response);
                    }
                }
            );
        };
    };
});