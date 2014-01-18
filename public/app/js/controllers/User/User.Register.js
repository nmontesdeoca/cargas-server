angular.module('Controllers')
.controller('User.Register', [
    '$scope',
    '$http',
    '$location',
    function ($scope, $http, $location) {
        $scope.user = {};

        $scope.$parent.menu_selected = '';
        $scope.$parent.title = 'Registro';

        $scope.register = function () {
            $http.post('/api/user', {
                first_name: $scope.user.first_name,
                last_name: $scope.user.last_name,
                email: $scope.user.email,
                password: $scope.user.password
            }).then(
                function (user) {
                    $http.post('/api/login', {
                        email: $scope.user.email,
                        password: $scope.user.password
                    }).then(
                        function (user) {
                            $location.url('/');
                        },
                        function () {
                            $location.url('/login');
                        }
                    );
                },
                function () {
                    $location.url('/login');
                }
            );
        };
    }
]);