angular.module('Controllers')
.controller('User.Login', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function ($scope, $rootScope, $http, $location) {
        $scope.user = {};

        $scope.$parent.menu_selected = 'Login';
        $scope.$parent.title = 'Login';

        $scope.login = function () {
            $http.post('/api/login', {
                email: $scope.user.email,
                password: $scope.user.password
            }).success(function (user) {
                // No error: authentication OK
                $rootScope.message = 'Authentication successful!';
                $location.url('/admin');
            })
            .error(function () {
                // Error: authentication failed
                $rootScope.message = 'Authentication failed.';
                $location.url('/login');
            });
        };
    }
]);