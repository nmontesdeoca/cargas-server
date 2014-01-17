angular.module('Controllers')
.controller('Refuel.List', ['$scope', function ($scope) {

    $scope.$parent.menu_selected = 'Refuels';
    $scope.$parent.title = 'Lista';

    $scope.delete = function (index) {
        $scope.refuels.splice(index, 1);
    };
}]);