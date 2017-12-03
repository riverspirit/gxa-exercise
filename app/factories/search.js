'use strict';

/**
 * Search service
 */
var app = angular.module('myApp.factories', []);

app.factory('SearchService', function ($q, $http) {

  return {
    doSearch: doSearch
  };

  /**
   * If a start and end year are given, construct a list of
   * all the years in that range including the given start and end years
   *
   * @param {number} yearFrom 
   * @param {number} yearTo 
   */
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

  /**
   * Make service calls to the REST API to get the number of publications
   * each year matching the given query.
   *
   * I was unable to find a service in the list of APIs that provided this functionality
   * as is, so what's done here is to make 'n' separate service calls for all the 'n' years in the range.
   * For each year's result, we are fetching just one item, sorted by the number of citations.
   * This one item will be the most cited book for the given year matching the search query.
   * 
   * @param {Object} params
   */
  function doSearch(params) {
    var allQs = {};
    var yearList = getYearList(params.yearFrom, params.yearTo);

    // Make n service calls for each of the n years
    yearList.forEach(function (year) {
      /*
       * URL params used:
       *
       * query              - Specify a search query to match
       * PUB_YEAR:[A TO B]  - Specify an year range
       * sort_cited:y       - Sort results with most cited publication first
       * format             - Specify a format for the response
       * pageSize           - Specify number of results to fetch
       * resulttype         - Specify whether full or lite version of results is needed
       */
      var queryUrl = 'https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=' +
          params.query + '%20AND%20PUB_YEAR:[' + year + '+TO+' + (year + 1) + ']%20' +
          'sort_cited:y&format=json&pageSize=1&resulttype=lite';

      allQs[year] = $http.get(queryUrl);
    });

    return $q.all(allQs);
  }
});