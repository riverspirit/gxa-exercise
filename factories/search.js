'use strict';

var app = angular.module('myApp.factories', []);

app.factory('SearchService', function ($q, $http) {

  return {
    doSearch: doSearch
  };

  function getYearList(yearFrom, yearTo) {
    var yearList = [];

    if (yearFrom > yearTo) {
      return [];
    }

    for (var year = Number(yearFrom); year <= Number(yearTo); year = year + 1) {
      yearList.push(year);
    }

    return yearList;
  }

  function doSearch(params) {
    var allQs = {};
    var yearList = getYearList(params.yearFrom, params.yearTo);

    yearList.forEach(function (year) {
      var queryUrl = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=' +
          params.query + '%20AND%20PUB_YEAR:[' + year + '+TO+' + (year + 1) + ']%20' +
          'sort_cited:y&format=json&pageSize=1&resulttype=lite';

      allQs[year] = $http.get(queryUrl);
    });

    return $q.all(allQs);
  }
});