angular.module('ProvidersModule')
.provider('$fuels', function () {

    this.fuels =  ['Fuel', function (Fuel) {
        return Fuel.query();
    }];

    this.$get = function () {};
});