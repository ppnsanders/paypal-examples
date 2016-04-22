'use strict';
angular.module('clientApp').service('apiModel', function($http, $cookies, $location, $window, $timeout) {

	function createPayment() {
		var reqUrl = '/api/createPayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        console.log(model.pmtData);
        return $http.post(reqUrl, model.pmtData, config).
	        success(function (response) {
	            model.createPaymentResponse = response;
	            console.log(model.createPaymentResponse);
	        }).
	        error(function (response) {
	            console.log('createPayment ERROR');
	            console.log(response);
	        });
	}

	function getPaymentDetails() {
		$('#loading').show();
		var reqUrl = '/api/getPaymentDetails';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.queryParams, config).
	        success(function (response) {
	            model.paymentDetails = response;
	            $timeout(function() {
                	$('#loading').hide();
	            	$('#paymentDetails').show();
            	}, 2000);
	            console.log(model.paymentDetails);
	        }).
	        error(function (response) {
	            console.log('getPaymentDetails ERROR');
	            console.log(response);
	        });
	}

	function executePayment() {
		$('#paymentDetails').hide();
		$('#loading').show();
		var reqUrl = '/api/executePayment';
        var config = {
            'xsrfHeaderName': 'X-CSRF-TOKEN',
            'xsrfCookieName': 'XSRF-TOKEN'
        };
        return $http.post(reqUrl, model.paymentDetails, config).
	        success(function (response) {
	            model.completePaymentDetails = response;
	            $timeout(function() {
                	$('#loading').hide();
	            	$('#completePaymentDetails').show();
            	}, 2000);
	            console.log(model.completePaymentDetails);
	        }).
	        error(function (response) {
	            console.log('executePayment ERROR');
	            console.log(response);
	        });
	}

	var model = {
		pmtData: {
			"intent":"sale",
			"redirect_urls":
				{
					"return_url":"http://localhost:3000/#/return",
					"cancel_url":"http://localhost:3000/#/cancel"
				},
			"payer":
				{
					"payment_method":"paypal"
				},
			"transactions":[
				{
					"amount":
					{
						"total":"15.00",
						"currency":"USD",
						"details":
							{
								"shipping":"2.00",
								"subtotal":"13.00",
								"tax":"0.00",
								"handling_fee":"0.00",
								"insurance":"0.00",
								"shipping_discount":"0.00"
							}
					},
					"description":"My Payment Description",
					"invoice_number": "ABCDEFGHIJK" + Date.now(),
					"item_list":
					{
						"items":
						[
							{
								"quantity":"1",
								"name":"Item 0 Name",
								"price":"7.00",
								"currency":"USD",
								"sku":"ABCDEFGHIJKL987654321",
								"description":"Item 0 Description",
								"tax":"0.00"
							},
							{
								"quantity":"1",
								"name":"Item 1 Name",
								"price":"2.00",
								"currency":"USD",
								"sku":"ABCDEFGHIJKL987654322",
								"description":"Item 1 Description",
								"tax":"0.00"
							},
							{
								"quantity":"1",
								"name":"Item 2 Name",
								"price":"2.00",
								"currency":"USD",
								"sku":"ABCDEFGHIJKL987654323",
								"description":"Item 2 Description",
								"tax":"0.00"
							},
							{
								"quantity":"1",
								"name":"Item 3 Name",
								"price":"2.00",
								"currency":"USD",
								"sku":"ABCDEFGHIJKL987654324",
								"description":"Item 3 Description",
								"tax":"0.00"
							}
						]
					}
				}
			]
		},
		currencySymbol: '$ ',
	    createPaymentResponse: {},
	    queryParams: {},
	    paymentDetails: {},
	    executePaymentButton: true,
	    completePaymentDetails: {},
		createPayment: function (model) {
			return createPayment(model);
		},
		getPaymentDetails: function (model) {
			return getPaymentDetails(model);
		},
		executePayment: function (model) {
			return executePayment(model);
		}
	};

return model;

});