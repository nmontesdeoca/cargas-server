angular.module('CarGas.User')
.controller('User.Logout', [
    '$scope',
    '$http',
    '$location',
    '$rootScope',
    function ($scope, $http, $location, $rootScope) {

        $scope.$parent.menuSelected = 'Logout';

        $rootScope.user = {};

        $http.get('/api/logout').then(function (user) {
            $location.url('/');
        });
    }
]);