angular.module('CarGas.Refuel')
.controller('Refuel.List', [
    '$scope',
    '$location',
    'Refuel',
    'refuels',
    'user',
    function ($scope, $location, Refuel, refuels, user) {

        $scope.$parent.menuSelected = 'Refuels';
        $scope.$parent.title = 'Lista';

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