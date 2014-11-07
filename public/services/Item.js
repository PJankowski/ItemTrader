angular.module('ItemTrader')
    .factory('Item', ['$http', '$location', 'postman', function($http, $location, postman){
        return {
            addItem: function(item){
                $http.post('/api/items', item)
                    .success(function(){
                        postman.success('Item added!');
                        $location.path('/addItem');
                    })
                    .error(function(reason){
                        postman.error('Error!', reason.message);
                        $location.path('/addItem');
                    });
            }
        }
    }]);