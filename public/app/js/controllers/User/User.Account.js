angular.module('Controllers')
.controller('User.Account', [
    '$scope',
    '$location',
    'user',
    function ($scope, $location, user) {

        $scope.$parent.menu_selected = 'Account';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.user = user;

        $scope.update = function () {
            $scope.user.$save(function () {
                $location.path('/');
            });
        };
    }
]);