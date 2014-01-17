angular.module('Controllers')
.controller('User.Account', [
    '$scope',
    function ($scope) {

        $scope.$parent.menu_selected = 'Account';
        $scope.$parent.title = 'Mi Cuenta';

        $scope.tab_selected = 'algo';

        $scope.tabs = [
            {
                text: 'algo',
                action: 'action'
            }
        ];

        $scope.changeTab = function (tab) {
            console.log(tab);
        };

    }
]);