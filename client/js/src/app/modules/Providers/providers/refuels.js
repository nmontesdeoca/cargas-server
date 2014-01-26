angular.module('ProvidersModule')
.provider('$refuels', function () {

    this.refuels = ['Refuel', function (Refuel) {
        return Refuel.query();
    }];

    this.$get = function () {};
});

