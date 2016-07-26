(function(){

    angular.module('lists')
        .component('listComponent', {
            templateUrl: 'app/components/list/list.html',
            controller: ListController,
            bindings: {
                // this is the attribute from the list-component element as written in the board html
                listObj: '<'
            }
        });

        ListController.$inject = ['ListService'];

        function ListController(ListService){
            // this.listObj = whatever was passed in through the ng directive inside the html tag
            var $ctrl = this;
            $ctrl.lists = ListService.getLists();     
            $ctrl.movingTask = false;       

            $ctrl.removeTask = function(task){
                ListService.removeTask($ctrl.listObj.id, task);
            };

            $ctrl.addTask = function(task){
                ListService.createTask($ctrl.listObj.id, task);
                $ctrl.newTask = {};
            };

            $ctrl.moveTask = function(fromList, toListName, task){
                for (var listId in $ctrl.lists){
                    if ($ctrl.lists[listId].name == toListName){
                        var toList = $ctrl.lists[listId];
                    }
                }
                ListService.moveTask(fromList, toList, task);
            }            

        }

}());



