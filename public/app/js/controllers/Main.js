angular.module('Controllers')
.controller('Main', ['$scope', function ($scope) {
    $scope.menu_selected = 'Home';

    $scope.tabs = [
        {
            menu: 'Account',
            href: '/account',
            text: 'Mi Cuenta'
        },
        {
            menu: 'Refuel',
            href: '/refuel',
            text: 'Cargar'
        },
        {
            menu: 'Refuels',
            href: '/refuels',
            text: 'Listar'
        },
        {
            menu: 'Logout',
            href: '/logout',
            text: 'Salir'
        }
    ];
}]);