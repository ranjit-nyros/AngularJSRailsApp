angular.module('eventsService', ['ngResource','willPaginate'])
  .factory('Events', function($resource) {
    return $resource('events.json', {}, {
      index: { method: 'GET', isArray: true},
      create: { method: 'POST' }
    });
  })
  .factory('Event', function($resource){
    return $resource('events/:event_id.json', {}, {
      show: { method: 'GET' },
      update: { method: 'PUT' },
      destroy: { method: 'DELETE' }
    });
  });
