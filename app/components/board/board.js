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
            }

            $ctrl.addList = function(list){
                ListService.createList(list);
                $ctrl.newList = {};
            }



        }

}());