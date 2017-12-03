'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.factories',
  'myApp.home'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
