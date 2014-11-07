angular.module('ItemTrader')
.controller('navCtrl', ['$scope', 'Auth', function($scope, Auth){
        $scope.logout = function(){
            Auth.logout();
        }
    }]);