angular.module('ItemTrader')
.factory('Auth', ['$rootScope', '$location', '$http', '$cookieStore', 'postman',
        function($rootScope, $location, $http, $cookieStore, postman){
            $rootScope.currentUser = $cookieStore.get('user');
            $cookieStore.remove('user');
            return {
                signup: function(user){
                    $http.post('/api/user', user)
                        .success(function(data){
                            $rootScope.currentUser = data;
                            $location.path('/profile');
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
                            $rootScope.currentUser = loggedUser;
                            $location.path('/profile');
                            postman.success('Logged in!');
                        })
                        .error(function(reason){
                            $location.path('/login');
                            postman.error('Error!', reason);
                        })
                },
                logout: function(){
                    $http.get('/api/logout')
                        .success(function(){
                            $rootScope.currentUser = null;
                            postman.success('Logged out!');
                            $location.path('/');
                        })
                        .error(function(){
                            postman.error('Error!');
                            $location.path('/login');
                        });
                }
            };
        }]);