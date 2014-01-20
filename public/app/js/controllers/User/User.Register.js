angular.module('Controllers')
.controller('User.Register', [
    '$scope',
    '$http',
    '$location',
    'User',
    function ($scope, $http, $location, User) {
        $scope.user = {};

        $scope.$parent.menu_selected = '';
        $scope.$parent.title = 'Registro';

        $scope.register = function () {
            new User({
                first_name: $scope.user.first_name,
                last_name: $scope.user.last_name,
                email: $scope.user.email,
                password: $scope.user.password
            }).$save(function () {
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
            });
        };
    }
]);