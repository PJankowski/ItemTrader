angular.module('ItemTrader')
.controller('ItemCtrl', ['$scope', '$routeParams', '$location', '$http', 'postman', function($scope, $routeParams, $location, $http, postman){
        $http.get('/api/item/' + $routeParams.id)
            .success(function(item){
                $scope.item = item;
            })
            .error(function(reason){
                postman.error('Error!', reason);
                $location.path('/');
            });

        $scope.removeItem = function(id){
            $http.delete('/api/item/' + id)
                .success(function(){
                    postman.success('Item removed!');
                    $location.path('/profile');
                })
                .error(function(reason){
                    postman.error('Error!', reason);
                })

        };
    }]);