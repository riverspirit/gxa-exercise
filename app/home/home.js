'use strict';

angular.module('myApp.home', ['ngRoute', 'ui.bootstrap', 'myApp.yearpicker-directive', 'myApp.highchartsBar-directive'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', ['$scope', 'SearchService', function($scope, SearchService) {
  // $scope.chartData = {years: [], data: []};
  $scope.search = function () {
    var yearFrom = $scope.yearFrom && $scope.yearFrom.getFullYear() || null;
    var yearTo = $scope.yearTo && $scope.yearTo.getFullYear() || null;

    if (!yearFrom && !yearTo) {
      yearTo = (new Date()).getFullYear();
      yearFrom = yearTo - 10;
    } else if (yearFrom && !yearTo) {
      yearTo = (new Date()).getFullYear();
    } else if (!yearFrom && yearTo) {
      yearFrom = yearTo - 10;
    }

    var params = {
      query: $scope.query,
      yearFrom: yearFrom,
      yearTo: yearTo
    };

    SearchService.doSearch(params).then(function (data) {
      console.log(processResponseForChart(data))
      $scope.chartData = processResponseForChart(data);
    });
    // console.log(data);
    // console.log(data.hitCount);
  };

  function processResponseForChart(data) {
    var years = [];
    var processedData = [];

    for (var year in data) {
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

  function pubDataSortFunction(a, b) {
    if (a.year < b.year) {
      return -1;
    } else if (a.year > b.year) {
      return 1;
    }
    return 0;
  }

  // $scope.chartData = {
  //   years: [ '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008' ],
  //   data: [
  //     {
  //      y: 29.9,
  //      mostCited: 'Book title',
  //      numCitations: 100
  //     },{
  //       y: 71.5,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      },{
  //       y: 106.4,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      },{
  //       y: 129.2,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      },{
  //       y: 144.0,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      },{
  //       y: 176.0,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      },{
  //       y: 135.6,
  //       mostCited: 'Book title',
  //       numCitations: 100
  //      }
  //   ]
  // };

}]);