angular.module('ItemTrader')
    .factory('User', ['$http', '$location', 'postman', function($http, $location, postman){
        return {
            signup: function(user){
                $http.post('/api/user', user)
                    .success(function(){
                        $location.path('/');
                        postman.success('Successful signup!');
                    })
                    .error(function(reason){
                        $location.path('/signup');
                        postman.error('Error!', reason);
                    });
            },
            login: function(user){
                $http.post('/api/login', user)
                    .success(function(loggedUser){
                        $location.path('/profile/' + loggedUser._id);
                        postman.success('Logged in!');
                    })
                    .error(function(reason){
                        $location.path('/login');
                        postman.error('Error!', reason);
                    })
            }
        }
    }]);