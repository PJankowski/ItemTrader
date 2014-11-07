angular.module('ItemTrader')
    .controller('UsersCtrl', ['$scope', 'Auth', function($scope, Auth){
        $scope.signup = function(){
            Auth.signup({
                first: $scope.first,
                last: $scope.last,
                email: $scope.email,
                username: $scope.username,
                password: $scope.password
            });
        };
        $scope.login = function(){
            Auth.login({
                username: $scope.username,
                password: $scope.password
            });
        };
    }]);