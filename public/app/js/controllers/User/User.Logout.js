angular.module('Controllers')
.controller('User.Logout', [
    '$scope',
    '$http',
    '$location',
    function ($scope, $http, $location) {

        $scope.$parent.menuSelected = 'Logout';

        $http.get('/api/logout').then(function (user) {
            $location.url('/');
        });
    }
]);