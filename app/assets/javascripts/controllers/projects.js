function ProjectsCtrl($scope, Projects,ngTableParams, Session) {
    "use strict";
    $scope.user = Session.requestCurrentUser();
    $scope.projects = Projects.index();
    $scope.logout = function() {
        Session.logout();
    };
    // $scope.tableParams = new ngTableParams({
    //             pdescrption: 1,            // show first pdescrption
    //             count: 3           // count per pdescrption
    //         }, {
    //             total: $scope.projects.length, // length of data
    //             getData: function($defer, params) {
    //                 $defer.resolve($scope.projects.slice((params.pdescrption() - 1) * params.count(), params.pdescrption() * params.count()));
    //             }
    //         });
}

function ProjectShowCtrl($scope, $location, $routeParams, $dialog, Project, Session) {"use strict";
    $scope.project = Project.show({
        project_id : $routeParams.project_id
    });

    $scope.remove = function(id) {
        var title = 'Delete Project?', msg = 'Are you sure you want to delete this project?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messdescrptionBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Project.destroy({
                    project_id : id
                }, function() {
                    $location.path('/projects');
                });
            }
        });
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function ProjectAddCtrl($scope, $location, Projects, Project, Session) {
    "use strict";
    $scope.project = {};
    $scope.create = function(project) {
        var projectService = new Projects(project);
        projectService.$create(function(project) {
            $location.path('/projects/' + project.id);
        });
    }
}

function ProjectEditCtrl($scope, $routeParams, $location, Project, Session) {
    "use strict";
    
    $scope.master = {};
    var project_id = $routeParams.project_id;
    $scope.project = Project.show({
        project_id : project_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(project) {
        project.$update({
            project_id : project_id
        }, function(updatedProject) {
            $location.path('/projects/' + updatedProject.id);
        });
    }
}
