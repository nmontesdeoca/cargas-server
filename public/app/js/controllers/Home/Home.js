angular.module('Controllers')
.controller('Home', ['$scope', function ($scope) {
    $scope.$parent.menu_selected = 'Home';
}]);