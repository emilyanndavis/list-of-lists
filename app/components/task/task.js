(function(){

    angular.module('lists')
        .component('taskComponent', {
            templateUrl: 'app/components/task/task.html',
            controller: TaskController,
            bindings: {
                taskObj: '<'
            },
            require: {
                list: '^listComponent'
            }
        });

        TaskController.$inject = ['ListService'];

        function TaskController(ListService){

            var $ctrl = this;
            $ctrl.lists = ListService.getLists();     

            $ctrl.removeTask = function(task){
                $ctrl.list.removeTask(task);    
            };
            
            $ctrl.moveTask = function(fromListId, toListName, task){
                $ctrl.list.moveTask(fromListId, toListName, task);
            };
            
        }

}());