angular.module('ItemTrader')
    .controller('ItemsCtrl', ['$scope', '$http', 'postman', function($scope, $http, postman){
            $http.get('/api/items')
                .success(function(items){
                    $scope.items = items;
                })
                .error(function(reason){
                    postman.error('Error!', reason);
                });
        }]);