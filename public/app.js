angular.module('ItemTrader', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'Postman'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'})
            .when('/items', {templateUrl: 'partials/items.html', controller: 'ItemsCtrl'})
            .when('/how-it-works', {templateUrl: 'partials/howItWorks.html', controller: 'HowCtrl'})
            .when('/login', {templateUrl: 'partials/login.html', controller: 'UsersCtrl'})
            .when('/signup', {templateUrl: 'partials/signup.html', controller: 'UsersCtrl'})
            .when('/profile', {templateUrl: 'partials/profile.html', controller: 'ProfileCtrl'})
            .when('/addItem', {templateUrl: 'partials/profile/addItem.html', controller: 'ProfileCtrl'})
            .otherwise({redirectTo: '/'});
    }]);