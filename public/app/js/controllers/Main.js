angular.module('Controllers')
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
}]);