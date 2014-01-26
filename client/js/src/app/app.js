angular.module('CarGas', ['ngRoute', 'ProvidersModule', 'MainModule', 'RefuelModule', 'UserModule', 'FuelModule'])
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