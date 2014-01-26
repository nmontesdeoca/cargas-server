angular.module('CarGas.Refuel', ['ngResource'])
.config([
    '$routeProvider',
    '$authenticationProvider',
    '$fuelsProvider',
    '$refuelProvider',
    '$refuelsProvider',
    function ($routeProvider, $authenticationProvider, $fuelsProvider, $refuelProvider, $refuelsProvider) {
        $routeProvider

        .when('/refuel', {
            templateUrl: '/js/src/app/modules/Refuel/views/form.html',
            controller: 'Refuel.Add',
            resolve: {
                fuels: $fuelsProvider.fuels,
                user: $authenticationProvider.checkLoggedIn
            }
        })
        .when('/refuel/:id', {
            templateUrl: '/js/src/app/modules/Refuel/views/form.html',
            controller: 'Refuel.Edit',
            resolve: {
                fuels: $fuelsProvider.fuels,
                user: $authenticationProvider.checkLoggedIn,
                refuel: $refuelProvider.refuel
            }
        })
        .when('/refuels', {
            templateUrl: '/js/src/app/modules/Refuel/views/list.html',
            controller: 'Refuel.List',
            resolve: {
                user: $authenticationProvider.checkLoggedIn,
                refuels: $refuelsProvider.refuels
            }
        });
    }
]);