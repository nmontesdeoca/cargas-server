angular.module('Controllers')
.controller('Refuel.Edit', [
    '$scope',
    '$routeParams',
    '$location',
    function ($scope, $routeParams, $location) {

        $scope.$parent.menu_selected = 'Refuel';
        $scope.$parent.title = 'Editar';

        $scope.refuel = $scope.refuels[$routeParams.index];

        $scope.update = function (refuel) {
            $scope.refuels[$routeParams.index] = $scope.refuel;
            $location.path('/list');
        };
    }
]);