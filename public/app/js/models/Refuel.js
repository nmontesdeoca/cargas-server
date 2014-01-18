angular.module('Controllers').factory('Refuel', ['$resource', function ($resource) {
    return $resource('/api/refuel/:id', { id: '@_id' });
}]);
