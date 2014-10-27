angular.module('ItemTrader')
    .controller('ProfileCtrl', ['$scope', '$routeParams', '$location', '$http', 'postman', function($scope, $routeParams, $location, $http, postman){
        $http.get('/api/user/profile/' + $routeParams.id)
            .success(function(newUser){
                $scope.user = newUser;
            })
            .error(function(reason){
                $location.path('/');
                postman.error('Error!', reason);
            });
    }]);