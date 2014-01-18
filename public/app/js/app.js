angular.module('CarGas', ['ngRoute', 'Controllers', 'Providers'])
.config([
    '$routeProvider',
    '$httpProvider',
    '$locationProvider',
    '$utilProvider',
    function ($routeProvider, $httpProvider, $locationProvider, $utilProvider) {

        $locationProvider.html5Mode(true);

        $httpProvider.responseInterceptors.push($utilProvider.interceptor);

        $routeProvider
        .when('/login', {
            templateUrl: '/app/views/User/login.html',
            controller: 'User.Login'
        })
        .when('/account', {
            templateUrl: '/app/views/User/account.html',
            controller: 'User.Account',
            resolve: {
                loggedin: $utilProvider.checkLoggedIn
            }
        })
        .when('/logout', {
            template: '',
            controller: 'User.Logout',
            resolve: {
                loggedin: $utilProvider.checkLoggedIn
            }
        })
        .when('/refuel', {
            templateUrl: '/app/views/Refuel/form.html',
            controller: 'Refuel.Add',
            resolve: {
                loggedin: $utilProvider.checkLoggedIn
            }
        })
        .when('/refuel/:id', {
            templateUrl: '/app/views/Refuel/form.html',
            controller: 'Refuel.Edit',
            resolve: {
                loggedin: $utilProvider.checkLoggedIn
            }
        })
        .when('/refuels', {
            templateUrl: '/app/views/Refuel/list.html',
            controller: 'Refuel.List',
            resolve: {
                loggedin: $utilProvider.checkLoggedIn
            }
        })
        .otherwise({
            redirectTo: '/refuels'
        });
    }
]);

angular.module('Controllers', ['ngResource']);
angular.module('Providers', []);