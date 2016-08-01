(function(){

    angular.module('lists')
        .service('ListService', function(){

            var ls = this;

            var lists;

            var i = 500;
            function assignId(){
                i++;
                return i;
            }

            ls.saveLists = function(){
                localStorage.setItem('lists', JSON.stringify(lists));
            };

            ls.getLists = function(){
                var storedLists = localStorage.getItem('lists');
                if (storedLists){
                    lists = JSON.parse(storedLists);
                } else {
                    lists = {};
                }
                return lists;
            };

            this.createList = function(list){
                lists = ls.getLists();
                list.id = assignId();
                while (lists[list.id]){
                    list.id = assignId();
                }
                list.tasks = [];
                lists[list.id] = list;
                ls.saveLists();
            };

            this.removeList = function(listId){
                lists = ls.getLists();
                if(!lists[listId]){
                    console.error('Bad ID bro');
                }                
                delete lists[listId];
                ls.saveLists();
            };

            function getToListOptions(task){
                var toListOptions = [];
                for (var listId in lists) {
                    if (listId != task.listId){
                        toListOptions.push(lists[listId].name);
                    }
                } 
                return toListOptions;               
            }

            this.createTask = function(listId, task){
                lists = ls.getLists();                
                if(!lists[listId]){
                    console.error('Bad ID bro');
                }
                task.listId = listId;
                task.moving = false;
                task.toListOptions = getToListOptions(task);
                lists[listId].tasks.push(task);
                ls.saveLists();
            };
        
            this.removeTask = function(task){
                lists = ls.getLists();                
                if(!lists[task.listId]){
                    console.error('Bad ID bro');
                } 
                var list = lists[task.listId]; 
                var taskInList = list.tasks.find(function(item){
                    return item.taskName == task.taskName;
                });              
                var i = list.tasks.indexOf(taskInList);
                list.tasks.splice(i, 1);
                ls.saveLists();
            };

            this.moveTask = function(fromListId, toListId, task){
                ls.removeTask(task);
                ls.createTask(toListId, task);
            };

        });

}());