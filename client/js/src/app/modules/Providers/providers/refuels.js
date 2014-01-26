angular.module('CarGas.Providers')
.provider('$refuels', function () {

    this.refuels = ['Refuel', function (Refuel) {
        return Refuel.query();
    }];

    this.$get = function () {};
});

