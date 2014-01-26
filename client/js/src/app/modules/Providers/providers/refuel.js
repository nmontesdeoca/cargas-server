angular.module('CarGas.Providers')
.provider('$refuel', function () {

    this.refuel = ['$route', 'Refuel', function ($route, Refuel) {
        return Refuel.get({ id: $route.current.params.id });
    }],

    this.$get = function () {};
});