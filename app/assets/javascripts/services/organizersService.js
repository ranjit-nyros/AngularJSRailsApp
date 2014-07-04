angular.module('organizersService', ['ngResource','willPaginate'])
  .factory('Organizers', function($resource) {
    return $resource('organizers.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Organizer', function($resource){
    return $resource('organizers/:organizer_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
