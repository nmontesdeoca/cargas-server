angular.module('CarGas', ['ngRoute', 'Controllers', 'Providers'])
.config(['$routeProvider', '$httpProvider', '$utilProvider', function ($routeProvider, $httpProvider, $utilProvider) {

    $httpProvider.responseInterceptors.push($utilProvider.interceptor);

    $routeProvider
    .when('/', {
        templateUrl: '/app/views/home.html',
        controller: 'Home',
        resolve: {
            loggedin: $utilProvider.checkLoggedIn
        }
    })
    .when('/login', {
        templateUrl: '/app/views/User/login.html',
        controller: 'User.Login'
    })
    .when('/form', {
        templateUrl: '/app/views/Refuel/form.html',
        controller: 'Refuel.Add',
        resolve: {
            loggedin: $utilProvider.checkLoggedIn
        }
    })
    .when('/form/:index', {
        templateUrl: '/app/views/Refuel/form.html',
        controller: 'Refuel.Edit',
        resolve: {
            loggedin: $utilProvider.checkLoggedIn
        }
    })
    .when('/list', {
        templateUrl: '/app/views/Refuel/list.html',
        controller: 'Refuel.List',
        resolve: {
            loggedin: $utilProvider.checkLoggedIn
        }
    })
    .otherwise({
        redirectTo: '/'
    });


}]);

angular.module('Controllers', []);
angular.module('Providers', []);