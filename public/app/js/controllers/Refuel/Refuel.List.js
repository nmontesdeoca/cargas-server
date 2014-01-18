angular.module('Controllers')
.controller('Refuel.List', ['$scope', '$location', 'Refuel', function ($scope, $location, Refuel) {

    $scope.$parent.menu_selected = 'Refuels';
    $scope.$parent.title = 'Lista';

    $scope.refuels = Refuel.query();

    $scope.delete = function (id) {
        var refuel = Refuel.get({ id: id }, function () {
            refuel.$remove(function () {
                $location.path('/');
            });
        });
    };
}]);