(function(){

    angular.module('lists')
        .service('ListService', function(){

            var ls = this;

            var lists = {};

            var i = 500;
            function assignId(){
                i++;
                return i;
            }

            this.getLists = function(){
                return lists;
            };

            this.createList = function(list){
                list.id = assignId();
                list.tasks = [];
                lists[list.id] = list;
            };

            this.removeList = function(listId){
                if(!lists[listId]){
                    console.error('Bad ID bro');
                }                
                delete lists[listId];
            };

            this.createTask = function(listId, task){
                if(!lists[listId]){
                    console.error('Bad ID bro');
                }
                lists[listId].tasks.push(task);
            };
        
            this.removeTask = function(listId, task){
                if(!lists[listId]){
                    console.error('Bad ID bro');
                }                
                var i = lists[listId].tasks.indexOf(task);
                lists[listId].tasks.splice(i, 1);
            };

            this.moveTask = function(fromList, toList, task){
                ls.createTask(toList.id, task);
                ls.removeTask(fromList.id, task);
            };


        });



}());