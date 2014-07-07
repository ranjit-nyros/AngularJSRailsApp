function OrganizersCtrl($scope, Organizers, Session) {
    "use strict";
    $scope.organizers = Organizers.index();
}

function OrganizerShowCtrl($scope, $location, $routeParams, $dialog, Organizer, Session) {"use strict";
    $scope.organizer = Organizer.show({
        organizer_id : $routeParams.organizer_id
    });

    $scope.remove = function(id) {
        var title = 'Delete Organizer?', msg = 'Are you sure you want to delete this organizer?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Organizer.destroy({
                    organizer_id : id
                }, function() {
                    $location.path('/organizers');
                });
            }
        });
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function OrganizerAddCtrl($scope, $location, Organizers, Organizer, Session) {
    "use strict";
    $scope.organizer = {};
    $scope.create = function(organizer) {
        var organizerService = new Organizers(organizer);
        organizerService.$create(function(organizer) {
            $location.path('/organizers/' + organizer.id);
        });
    }
}

function OrganizerEditCtrl($scope, $routeParams, $location, Organizer, Session) {
    "use strict";
    
    $scope.master = {};
    var organizer_id = $routeParams.organizer_id;
    $scope.organizer = Organizer.show({
        organizer_id : organizer_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(organizer) {
        organizer.$update({
            organizer_id : organizer_id
        }, function(updatedOrganizer) {
            $location.path('/organizers/' + updatedOrganizer.id);
        });
    }
}
