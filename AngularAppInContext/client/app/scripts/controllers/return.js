'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ReturnCtrl
 * @description
 * # ReturnCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ReturnCtrl', ['$scope', '$location', 'apiModel', function($scope, $location, apiModel) {
    $scope.model = apiModel;
    $scope.model.queryParams = $location.search();
	$scope.model.getPaymentDetails();
  }]);
