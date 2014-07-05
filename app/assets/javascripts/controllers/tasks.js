function TasksCtrl($scope, Tasks) {
    "use strict";
    $scope.tasks = Tasks.index();

}

function TaskShowCtrl($scope, $location, $routeParams, $dialog,$http, Task,Project) {"use strict";
    $scope.task = Task.show({
        task_id : $routeParams.task_id
    },function(data){
    $scope.pjct = Project.show({project_id : data.project_id});
     });
    $scope.remove = function(id) {
        var title = 'Delete Task?', msg = 'Are you sure you want to delete this Task?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Task.destroy({
                    task_id : id
                }, function() {
                    $location.path('/tasks');
                });
            }
        });
    };
    
    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };
}

function TaskAddCtrl($scope, $location, $http ,Tasks, Task,Projects) {
    "use strict";
    $scope.task = {};
    $scope.projects =  Projects.query();
    $scope.create = function(task) {
        var taskService = new Tasks(task);
        taskService.$create(function(task) {
            $location.path('/tasks/' + task.id);
        });
    }
}

function TaskEditCtrl($scope, $routeParams, $location, $http,Task) {
    "use strict";
    
    $scope.master = {};
    var task_id = $routeParams.task_id;
    $scope.task = Task.show({
        task_id : task_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(task) {
        task.$update({
            task_id : task_id
        }, function(updatedTask) {
            $location.path('/tasks/' + updatedTask.id);
        });
    }
}

