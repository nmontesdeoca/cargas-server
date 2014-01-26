angular.module('CarGas.Providers')
.provider('$authentication', function () {

    this.checkLoggedIn = ['$q', '$http', '$location', '$rootScope', 'User',
        function ($q, $http, $location, $rootScope, User) {
            var deferred = $q.defer();

            $http.get('/api/loggedin').success(function (user) {
                if (user !== '0') {
                    deferred.resolve(new User(user));
                } else {
                    $rootScope.message = 'You need to log in.';
                    deferred.reject();
                    $location.url('/login');
                }
            });

            return deferred.promise;
        }
    ];

    this.interceptor = ['$q', '$location', function ($q, $location) {
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
    }];

    this.$get = function () {};
});