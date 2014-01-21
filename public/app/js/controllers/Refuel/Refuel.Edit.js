angular.module('Controllers')
.controller('Refuel.Edit', [
    '$scope',
    '$routeParams',
    '$location',
    'Refuel',
    'fuels',
    function ($scope, $routeParams, $location, Refuel, fuels) {

        $scope.$parent.menu_selected = 'Refuel';
        $scope.$parent.title = 'Editar';

        $scope.fuels = fuels;

        $scope.refuel = Refuel.get({ id: $routeParams.id });

        $scope.update = function () {
            $scope.refuel.$save(function () {
                $location.path('/');
            });
        };
    }
]);