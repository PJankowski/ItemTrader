angular.module('ItemTrader')
    .controller('ProfileCtrl', ['$scope', '$rootScope', '$location', '$http', 'postman', 'Item', function($scope, $rootScope, $location, $http, postman, Item){
        if($rootScope.currentUser) {
            $http.get('/api/user/profile/' + $rootScope.currentUser._id)
                .success(function (newUser) {
                    $scope.user = newUser;
                    $http.get('/api/users/items/' + $rootScope.currentUser._id)
                        .success(function (items) {
                            $scope.items = items;
                        })
                        .error(function (reason) {
                            postman.error('Error!', reason.message);
                        });
                })
                .error(function (reason) {
                    $location.path('/');
                    postman.error('Error!', reason);
                });
        }else{
            $location.path('/');
        }

        $scope.addItem = function(){
            var item = {
                name: $scope.name,
                description: $scope.description,
                image: 'iPhone.jpg',
                wanted: $scope.wanted,
                owner: $rootScope.currentUser._id
            };
            Item.addItem(item);
        };
    }]);