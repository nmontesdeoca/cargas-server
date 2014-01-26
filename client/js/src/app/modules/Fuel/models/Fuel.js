angular.module('CarGas.Fuel').factory('Fuel', ['$resource', function ($resource) {
    return $resource('/api/fuel/:id', { id: '@_id' });
}]);
