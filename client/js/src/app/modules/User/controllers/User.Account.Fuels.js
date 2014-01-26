angular.module('UserModule')
.controller('User.Account.Fuels', [
    '$scope',
    '$location',
    '$filter',
    'user',
    'fuels',
    'Fuel',
    function ($scope, $location, $filter, user, fuels, Fuel) {

        $scope.$parent.menuSelected = 'Account';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.user = user;
        $scope.fuel = new Fuel({
            user: user._id
        });
        $scope.fuels = fuels;

        $scope.defaultFuels = function (fuel) {
            return !fuel.user;
        },

        $scope.myFuels = function (fuel) {
            return fuel.user === $scope.user._id;
        };

        $scope.add = function () {
            $scope.fuel.$save();
            $scope.fuels.push($scope.fuel);
            $scope.fuel = new Fuel();
        };

        $scope.delete = function (id) {
            var fuel = Fuel.get({ id: id }, function () {
                fuel.$remove();
                $scope.fuels = $filter('filter')($scope.fuels, function (fuel) {
                    return fuel._id !== id;
                });
            });
        };
    }
]);

