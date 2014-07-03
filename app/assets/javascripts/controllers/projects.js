function ProjectsCtrl($scope, Projects) {
    "use strict";
    $scope.projects = Projects.index();
}

function ProjectShowCtrl($scope, $location, $routeParams, $dialog, Project) {"use strict";
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

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
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

function ProjectAddCtrl($scope, $location, Projects, Project) {
    "use strict";
    $scope.project = {};
    $scope.create = function(project) {
        var projectService = new Projects(project);
        projectService.$create(function(project) {
            $location.path('/projects/' + project.id);
        });
    }
}

function ProjectEditCtrl($scope, $routeParams, $location, Project) {
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

