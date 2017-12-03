'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'myApp.yearpicker-directive', 'myApp.highchartsBar-directive'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', 'SearchService', function($scope, SearchService) {
  $scope.search = function () {
    var yearFrom = $scope.yearFrom && $scope.yearFrom.getFullYear() || null;
    var yearTo = $scope.yearTo && $scope.yearTo.getFullYear() || null;

    if (!yearFrom && !yearTo) {
      // If year range is't specified, assume range as the last 10 years
      yearTo = (new Date()).getFullYear();
      yearFrom = yearTo - 10;
    } else if (yearFrom && !yearTo) {
      // If only 'from year' is specified, assume range from
      // the given 'from year' to the current year.
      yearTo = (new Date()).getFullYear();
    } else if (!yearFrom && yearTo) {
      // If only 'to year' is specified, assume the last 10 years from the given 'to year'
      yearFrom = yearTo - 10;
    }

    var params = {
      query: $scope.query,
      yearFrom: yearFrom,
      yearTo: yearTo
    };

    SearchService.doSearch(params).then(function (data) {
      $scope.chartData = processResponseForChart(data);
    });
  };

  /**
   * Process the service response and construct in the format required for
   * Highcharts.
   *
   * @param {Object} data - service response
   */
  function processResponseForChart(data) {
    var years = [];
    var processedData = [];

    for (var year in data) {
      // Show an year in the graph only if these is at least one matching publication
      // in that year
      if (data[year] && data[year].data && data[year].data.hitCount > 0) {
        years.push(year);

        var datum = {
          year: Number(year),
          y: data[year].data.hitCount,
          mostCited: data[year].data.resultList &&
            data[year].data.resultList.result &&
            data[year].data.resultList.result[0] &&
            data[year].data.resultList.result[0].title || ''
        };
  
        processedData.push(datum);
      }
    }

    years.sort();
    processedData.sort(pubDataSortFunction);
    
    return {
      years: years,
      data: processedData
    };
  }

  /**
   * Sort function to sort the publications search results in the incrementing order of year
   *
   * @param {Object} a
   * @param {Object} b
   */
  function pubDataSortFunction(a, b) {
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    }
    return 0;
  }

}]);