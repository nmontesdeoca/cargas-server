angular.module('CarGas.Refuel')
.controller('Refuel.List', [
    '$scope',
    '$location',
    '$rootScope',
    'Refuel',
    'refuels',
    'user',
    function ($scope, $location, $rootScope, Refuel, refuels, user) {

        $scope.$parent.menuSelected = 'Refuels';
        $scope.$parent.title = 'Lista';

        $rootScope.user = user;

        $scope.refuels = refuels;

        $scope.delete = function (id) {
            var refuel = Refuel.get({ id: id }, function () {
                refuel.$remove(function () {
                    $location.path('/');
                });
            });
        };
    }
]);