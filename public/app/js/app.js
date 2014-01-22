angular.module('CarGas', ['ngRoute', 'Controllers'])
.config([
    '$routeProvider',
    '$httpProvider',
    '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {

        var utils = {
            fuels: ['Fuel', function (Fuel) {
                return Fuel.query();
            }],

            checkLoggedIn: ['$q', '$http', '$location', '$rootScope', 'User',
                function ($q, $http, $location, $rootScope, User) {
                    var deferred = $q.defer();

                    $http.get('/api/loggedin').success(function (user) {
                        if (user !== '0') {
                            deferred.resolve(new User(user));
                        } else {
                            $rootScope.message = 'You need to log in.';
                            //deferred.reject();
                            $location.url('/login');
                        }
                    });

                    return deferred.promise;
                }
            ],

            interceptor: ['$q', '$location', function ($q, $location) {
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
            }]
        };

        $locationProvider.html5Mode(true);

        $httpProvider.responseInterceptors.push(utils.interceptor);

        $routeProvider
        .when('/login', {
            templateUrl: '/app/views/User/login.html',
            controller: 'User.Login'
        })
        .when('/register', {
            templateUrl: '/app/views/User/register.html',
            controller: 'User.Register'
        })
        .when('/account', {
            templateUrl: '/app/views/User/account.html',
            controller: 'User.Account',
            resolve: {
                user: utils.checkLoggedIn
            }
        })
        .when('/logout', {
            template: '',
            controller: 'User.Logout',
            resolve: {
                user: utils.checkLoggedIn
            }
        })
        .when('/refuel', {
            templateUrl: '/app/views/Refuel/form.html',
            controller: 'Refuel.Add',
            resolve: {
                fuels: utils.fuels,
                user: utils.checkLoggedIn
            }
        })
        .when('/refuel/:id', {
            templateUrl: '/app/views/Refuel/form.html',
            controller: 'Refuel.Edit',
            resolve: {
                fuels: utils.fuels,
                user: utils.checkLoggedIn
            }
        })
        .when('/refuels', {
            templateUrl: '/app/views/Refuel/list.html',
            controller: 'Refuel.List',
            resolve: {
                user: utils.checkLoggedIn
            }
        })
        .otherwise({
            redirectTo: '/refuels'
        });
    }
]);

angular.module('Controllers', ['ngResource']);