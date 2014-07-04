function EventsCtrl($scope, Events) {
    "use strict";
    $scope.events = Events.index();
}

function EventShowCtrl($scope, $location, $routeParams, $dialog, Event) {"use strict";
    $scope.event = Event.show({
        event_id : $routeParams.event_id
    });

    $scope.remove = function(id) {
        var title = 'Delete Event?', msg = 'Are you sure you want to delete this event?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Event.destroy({
                    event_id : id
                }, function() {
                    $location.path('/events');
                });
            }
        });
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function EventAddCtrl($scope, $location,$http ,Events, Event,Organizers) {
    "use strict";
    $scope.event = {};
    $scope.organizers = Organizers.query();
    $scope.create = function(event) {
        var eventService = new Events(event);
        console.log(eventService);
        eventService.$create(function(event) {
            $location.path('/events/' + event.id);
        });
    }
}

function EventEditCtrl($scope, $routeParams, $location, Event) {
    "use strict";
    
    $scope.master = {};
    var event_id = $routeParams.event_id;
    $scope.event = Event.show({
        event_id : event_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(event) {
        event.$update({
            event_id : event_id
        }, function(updatedEvent) {
            $location.path('/events/' + updatedEvent.id);
        });
    }
}



