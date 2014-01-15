angular.module('controllers', [])

.controller('Home', ['$scope', function ($scope) {
    $scope.$parent.menu_selected = 'Home';
}])

.controller('Main', ['$scope', function ($scope) {
    $scope.menu_selected = 'Home';
    $scope.refuels = [
        {
            cost: 10,
            kilometers: 54000,
            capacity: 10,
            date: new Date()
        },
        {
            cost: 24.00,
            kilometers: 58000,
            capacity: 15,
            date: new Date()
        },
        {
            cost: 89,
            kilometers: 63000,
            capacity: 20,
            date: new Date()
        },
        {
            cost: 30.00,
            kilometers: 74000,
            capacity: 25,
            date: new Date()
        }
    ];
}])

.controller('Edit', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
    $scope.$parent.menu_selected = 'Form';

    $scope.refuel = $scope.refuels[$routeParams.index];

    $scope.update = function (refuel) {
        $scope.refuels[$routeParams.index] = $scope.refuel;
        $location.path('/list');
    };
}])

.controller('Add', ['$scope', '$location', function ($scope, $location) {
    $scope.$parent.menu_selected = 'Form';

    $scope.update = function (refuel) {
        $scope.refuel.date = new Date();
        $scope.refuels.push($scope.refuel);
        $location.path('/list');
    };
}])

.controller('List', ['$scope', function ($scope) {
    $scope.$parent.menu_selected = 'List';

    $scope.delete = function (index) {
        $scope.refuels.splice(index, 1);
    };
}])
;