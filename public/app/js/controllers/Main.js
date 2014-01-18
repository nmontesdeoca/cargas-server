angular.module('Controllers')
.controller('Main', ['$rootScope', function ($rootScope) {
    $rootScope.menu_selected = 'Home';

    $rootScope.tabs = [
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