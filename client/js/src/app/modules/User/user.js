angular.module('UserModule', ['ngResource'])
.config([
    '$routeProvider',
    '$authenticationProvider',
    '$fuelsProvider',
    function ($routeProvider, $authenticationProvider, $fuelsProvider) {

        $routeProvider

        .when('/login', {
            templateUrl: '/js/src/app/modules/User/views/login.html',
            controller: 'User.Login'
        })
        .when('/register', {
            templateUrl: '/js/src/app/modules/User/views/register.html',
            controller: 'User.Register'
        })
        .when('/account', {
            templateUrl: '/js/src/app/modules/User/views/account.html',
            controller: 'User.Account',
            resolve: {
                user: $authenticationProvider.checkLoggedIn,
                fuels: $fuelsProvider.fuels
            }
        })
        .when('/account/fuels', {
            templateUrl: '/js/src/app/modules/User/views/account.fuels.html',
            controller: 'User.Account.Fuels',
            resolve: {
                user: $authenticationProvider.checkLoggedIn,
                fuels: $fuelsProvider.fuels
            }
        })
        .when('/logout', {
            template: '',
            controller: 'User.Logout',
            resolve: {
                user: $authenticationProvider.checkLoggedIn
            }
        });
    }
]);