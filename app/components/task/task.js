(function(){

    angular.module('lists')
        .component('taskComponent', {
            templateUrl: 'app/components/task/task.html',
            controller: TaskController,
            bindings: {
                taskObj: '<'
            }
        });

        function TaskController(){

        }

}());