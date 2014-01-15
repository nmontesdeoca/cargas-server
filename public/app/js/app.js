angular.module('CarGas', ['ngRoute', 'controllers'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'Home'
    })
    .when('/form', {
        templateUrl: 'partials/form.html',
        controller: 'Add'
    })
    .when('/form/:index', {
        templateUrl: 'partials/form.html',
        controller: 'Edit'
    })
    .when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'List'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
