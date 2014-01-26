angular.module('CarGas.Refuel').factory('Refuel', ['$resource', function ($resource) {
    return $resource('/api/refuel/:id', { id: '@_id' });
}]);
