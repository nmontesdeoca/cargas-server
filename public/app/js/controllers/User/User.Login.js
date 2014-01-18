angular.module('Controllers')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    function ($scope, $http, $location) {
        $scope.user = {};

        $scope.$parent.menu_selected = 'Login';
        $scope.$parent.title = 'Login';

        $scope.login = function () {
            $http.post('/api/login', {
                email: $scope.user.email,
                password: $scope.user.password
            }).then(
                function (user) {
                    $location.url('/admin');
                },
                function () {
                    $location.url('/login');
                }
            );
        };
    }
]);