angular.module('CarGas', [
    'ngRoute',
    'CarGas.Providers',
    'CarGas.Main',
    'CarGas.Refuel',
    'CarGas.User',
    'CarGas.Fuel'
])
.config([
    '$routeProvider',
    '$httpProvider',
    '$locationProvider',
    '$authenticationProvider',
    function ($routeProvider, $httpProvider, $locationProvider, $authenticationProvider) {

        $locationProvider.html5Mode(true);

        $httpProvider.responseInterceptors.push($authenticationProvider.interceptor);

        $routeProvider.otherwise({
            redirectTo: '/refuels'
        });
    }
]);