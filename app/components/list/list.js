(function(){

    angular.module('lists')
        .component('listComponent', {
            templateUrl: 'app/components/list/list.html',
            controller: ListController,
            bindings: {
                // this is the attribute from the list-component element as written in the board html
                listObj: '<'
            },
            require: {
                board: '^boardComponent'
            }
        });

        ListController.$inject = ['ListService'];

        function ListController(ListService){
            // this.listObj = whatever was passed in through the ng directive inside the html tag
            var $ctrl = this;
            $ctrl.lists = ListService.getLists();     

            $ctrl.removeTask = function(task){
                var listId = task.listId;
                ListService.removeTask(task);
                $ctrl.listObj = ListService.getLists()[listId];     
            };

            $ctrl.addTask = function(listId, task){
                ListService.createTask(listId, task);
                $ctrl.newTask = {};
                $ctrl.listObj = ListService.getLists()[listId];     
            };

            $ctrl.moveTask = function(fromListId, toListName, task){
                $ctrl.board.moveTask(fromListId, toListName, task);
            }

        }

}());



