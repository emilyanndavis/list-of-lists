(function(){

    angular.module('lists')
        .component('boardComponent', {
            templateUrl: 'app/components/board/board.html',
            controller: BoardController
        });

        BoardController.$inject = ['ListService'];

        function BoardController(ListService){
            var $ctrl = this;
            $ctrl.lists = ListService.getLists();
            $ctrl.addingList = false;

            $ctrl.removeList = function(list){
                ListService.removeList(list.id);
                $ctrl.lists = ListService.getLists();
            }

            $ctrl.addList = function(list){
                ListService.createList(list);
                $ctrl.newList = {};
                $ctrl.lists = ListService.getLists();
            }

            $ctrl.moveTask = function(fromListId, toListName, task){
                task.moving = false;
                var toListId = Object.keys($ctrl.lists).find(function(listId){
                    return $ctrl.lists[listId].name == toListName;
                });
                ListService.moveTask(fromListId, toListId, task);
                $ctrl.lists = ListService.getLists();
            };                       

        }

}());