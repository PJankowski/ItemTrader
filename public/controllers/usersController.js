angular.module('ItemTrader')
    .controller('UsersCtrl', ['$scope', 'User', function($scope, User){
        $scope.signup = function(){
            User.signup({
                first: $scope.first,
                last: $scope.last,
                email: $scope.email,
                username: $scope.username,
                password: $scope.password
            });
        };
        $scope.login = function(){
            User.login({
                username: $scope.username,
                password: $scope.password
            });
        };
    }]);