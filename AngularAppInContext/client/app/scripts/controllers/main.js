'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', ['$scope', 'angularLoad', '$location', 'apiModel', function($scope, angularLoad, $location, apiModel) {
        $scope.model = apiModel;
        angularLoad.loadScript('https://www.paypalobjects.com/api/checkout.js').then(function() {
            function doCheckout() {
                paypal.checkout.initXO();
                var createPayment = $scope.model.createPayment();
                createPayment.success(function (response) {
                    console.log('createPayment Success: ', response);
                    paypal.checkout.startFlow(response.token);
                });
                createPayment.error(function (err) {
                    console.error('createPayment ERROR ', err);
                    paypal.checkout.closeFlow();
                });
            }
            console.log('checkout.js loaded');
            paypal.checkout.setup('MFUX86KBB6EM2', {
                environment: 'sandbox',
                container: 'paypalForm',
                click: doCheckout
            });
        }).catch(function (error) {
            console.log('ERROR: When Rendering Checkout with PayPal Button - ');
            console.log(error);
        });
    }]);
