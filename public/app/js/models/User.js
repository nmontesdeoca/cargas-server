angular.module('Controllers').factory('User', ['$resource', function ($resource) {
    return $resource('/api/user/:id', { id: '@_id' });
    // { addCar: { method: 'POST', url: '/api/user/:id/cars' } }
}]);
