angular.module('Controllers')
.controller('Refuel.Add', ['$scope', '$location', 'Refuel', function ($scope, $location, Refuel) {

    $scope.$parent.menu_selected = 'Refuel';
    $scope.$parent.title = 'Cargar';

    $scope.update = function () {
        new Refuel($scope.refuel).$save(function () {
            $location.path('/list');
        });
    };

}]);