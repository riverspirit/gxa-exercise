'use strict';

/**
 * Highcharts directive for bar (column) chart
 *
 * @example
 * <highcharts-bar data="chartData"></highcharts-bar>
 */

angular.module('myApp.highchartsBar-directive', [])

  .controller('highchartsBarCtrl', ['$scope', function ($scope) {
    $scope.chartOptions = {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      xAxis: {
          categories: $scope.data.years,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number of publications'
          }
      },
      tooltip: {
          headerFormat: '<span style="color:{series.color};padding:0">Year:</span> <span><b>{point.key}</b></span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">Publications: </td>' +
              '<td style="padding:0"><b>{point.y}</b></td></tr>' +
              '<tr><td style="color:{series.color};padding:0">Most cited: </td>' +
              '<td style="padding:0"><b>{point.mostCited}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
        type: 'column',
        data: $scope.data.data,
        showInLegend: false
    }]
  };

  }])

  .directive('highchartsBar', function () {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: 'highchartsBarCtrl',
      template: '<div style="min-width: 310px; height: 400px; margin: 0 auto"></div>',
      link: function (scope, element) {
        scope.$watch('data', function (newData, oldData) {
          if (newData && newData.years && newData.data) {
            if (!scope.chart) {
              // If a chart hasn't be created yet, create one
              scope.chart = Highcharts.chart(element[0], scope.chartOptions);
            } else {
              // If a chart is already rendered, just update it with the new values
              scope.chart.xAxis[0].setCategories(newData.years, false);
              scope.chart.series[0].setData(newData.data, false);
              scope.chart.redraw();
            }
          }
        });
      },
    };
  });