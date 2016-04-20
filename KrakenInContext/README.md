# Simple [KrakenJS](http://krakenjs.com/) Example with In-Context using [DustJS](http://www.dustjs.com/)

## How to use this example

1. Start at the [parent repo](https://github.com/ppnsanders/paypal-examples).
2. `$ cd KrakenInContext`
3. `$ npm install`
4. `$ bower install`
5. `$ npm start`
6. Open your browser to `http://localhost:8000`

## How it works

When you open your browser the file located at `KrakenInContext/public/templates/index.dust` will render the button in the browser.

When you click the button, this does a `GET` request to the `/checkout` URL in the router `KrakenInContext/controllers/index.js`.

The Terminal will display the following:

After the function `paypal.generate_token()`, the token response will display:

```json
----------------------------------------------------------
----------       ACCESS TOKEN RESPONSE          ----------
----------------------------------------------------------
"Bearer XXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Once a token is created the `paypal.payment.create()` function will run to create the payment token.

Request:

```json
----------------------------------------------------------
----------             CREATE PAYMENT           ----------
----------------------------------------------------------
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:8000/return","cancel_url":"http://localhost:8000/cancel"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
```

Response:

```json
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-89F78937YK8551108K4LK5MQ","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-04-19T22:18:26Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-7L647897K83050422","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
```

Since we want to force the In-Context experience, we modify the URL from `www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-XXXXX...` to `www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-7L647897K83050422`.

> The `useraction=commit` is optional.

```json
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-7L647897K83050422',
  token: 'EC-7L647897K83050422' }
```

After the URL is modified we redirect the user to PayPal and open the In-Context window.

```json
----------------------------------------------------------
----------          REDIRECTING USER            ----------
----------------------------------------------------------
https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-7L647897K83050422
```

Once the user is complete at PayPal, the user is returned to the `/return` URL, which initiates the controller at `KrakenInContext/controllers/index.js`.  The Query Params in the URL are then picked up by the controller.

```json
----------------------------------------------------------
----------       RETURN WITH QUERY PARAMS       ----------
----------------------------------------------------------
{"paymentId":"PAY-89F78937YK8551108K4LK5MQ","token":"EC-7L647897K83050422","PayerID":"N9DBPUZ67JDBC"}
```

The controller uses the query params to run the `paypal.payment.get()` function.  This returns the payment details to the application.

```json
----------------------------------------------------------
----------             PAYMENT DETAILS          ----------
----------------------------------------------------------
{"id":"PAY-89F78937YK8551108K4LK5MQ","intent":"sale","state":"created","cart":"7L647897K83050422","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://sandersx.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:8000/return?paymentId=PAY-89F78937YK8551108K4LK5MQ","cancel_url":"http://localhost:8000/cancel"},"create_time":"2016-04-19T22:18:26Z","update_time":"2016-04-19T22:25:06Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-7L647897K83050422","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
```

The application then uses the information returned from the `paypal.payment.get()` function to run `paypal.payment.execute()`.

```json
----------------------------------------------------------
----------      PAYMENT COMPLETED DETAILS       ----------
----------------------------------------------------------
{"id":"PAY-89F78937YK8551108K4LK5MQ","intent":"sale","state":"approved","cart":"7L647897K83050422","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"12C70021VB6446002","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-89F78937YK8551108K4LK5MQ","create_time":"2016-04-19T22:25:06Z","update_time":"2016-04-19T22:25:06Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/12C70021VB6446002","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/12C70021VB6446002/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-04-19T22:25:07Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-89F78937YK8551108K4LK5MQ","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The payment is now complete.