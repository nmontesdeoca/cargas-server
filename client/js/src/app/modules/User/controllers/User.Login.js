angular.module('CarGas.User')
.controller('User.Login', [
    '$scope',
    '$http',
    '$location',
    '$rootScope',
    function ($scope, $http, $location, $rootScope) {
        $scope.user = {};
        $rootScope.error = null;

        $scope.$parent.menuSelected = 'Login';
        $scope.$parent.title = 'Ingreso';

        $scope.login = function () {
            $http.post('/api/login', {
                email: $scope.user.email,
                password: $scope.user.password
            }).then(
                function (response) {
                    if (response && response.data) {
                        if (response.data.user) {
                            $location.url('/');
                        } else if (response.data.errorMessage) {
                            $rootScope.error = response.data.errorMessage;
                        }
                    }
                    else {
                        $rootScope.error = 'Pasó algo!';
                    }
                },
                function () {
                    $location.url('/login');
                }
            );
        };
    }
]);