angular.module('Controllers')
.controller('Refuel.Add', ['$scope', '$location', function ($scope, $location) {

    $scope.$parent.menu_selected = 'Refuel';
    $scope.$parent.title = 'Cargar';

    $scope.update = function (refuel) {
        $scope.refuel.date = new Date();
        $scope.refuels.push($scope.refuel);
        $location.path('/list');
    };
}]);