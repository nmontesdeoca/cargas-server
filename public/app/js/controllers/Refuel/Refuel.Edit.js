angular.module('Controllers')
.controller('Refuel.Edit', [
    '$scope',
    '$routeParams',
    '$location',
    'Refuel',
    function ($scope, $routeParams, $location, Refuel) {

        $scope.$parent.menu_selected = 'Refuel';
        $scope.$parent.title = 'Editar';

        $scope.refuel = Refuel.get({ id: $routeParams.id });

        $scope.update = function () {
            $scope.refuel.$save(function () {
                $location.path('/');
            });
        };
    }
]);