'use strict';

/**
 * Yearpicker directive
 * 
 * @example
 * <yearpicker placeholderText="From" year="yearModel"></yearpicker>
 */
angular.module('myApp.yearpicker-directive', [])

.controller('yearpickerCtrl', ['$scope', function ($scope) {
  $scope.isOpen = false;
  $scope.dt = new Date();
  $scope.dateOptions = {
    datepickerMode: 'year',
    minMode: 'year'
  };

  $scope.toggleDisplay = function () {
    $scope.isOpen = !$scope.isOpen;
  };
}])

.directive('yearpicker', function() {
  return {
    restrict: 'E',
    scope: {
      placeholderText: '@',
      year: '='
    },
    controller: 'yearpickerCtrl',
    templateUrl: 'components/yearpicker/template.html'
  };
});