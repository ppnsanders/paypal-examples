# Simple [KrakenJS](http://krakenjs.com/) Example with In-Context using [AngularJS](https://angularjs.org/)

## How to use this example

1. Start at the [parent repo](https://github.com/ppnsanders/paypal-examples).
2. `$ cd KrakenInContextAngular`
3. `$ npm install`
4. `$ bower install`
5. `$ npm start`
6. Open your browser to `http://localhost:8000`

## How it works

When you open your browser the file located at `KrakenInContextAngular/public/templates/index.dust` will render the button in the browser via the Angular Directive located at: `KrakenInContextAngular/public/js/cart-page/directive.js`.

When you click the button, this does calls the `doCheckout` function in the Angular Directive located at `KrakenInContextAngular/public/js/cart-page/directive.js`.  The create payment request is sent from the front-end to the backend.

The Terminal will display the following:

```json
----------------------------------------------------------
----------         PAYMENT_DETAILS OBJ          ----------
----------------------------------------------------------
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:8000/return/#","cancel_url":"http://localhost:8000/cancel/#"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
```

After receiving the Request POST, we'll run these functions:

`paypal.generate_token()`, the token response will display:

```json
----------------------------------------------------------
----------       ACCESS TOKEN RESPONSE          ----------
----------------------------------------------------------
"Bearer XXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Once a token is created the `paypal.payment.create()` function will run using the Payment details passed from the front-end angular app to create the payment token.

```json
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-1CX117288G942581AK4LUQYA","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-04-20T09:14:08Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-7DN22424UX202480U","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
```

Since we want to force the In-Context experience, we modify the URL from `www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-XXXXX...` to `www.sandbox.paypal.com/checkoutnow?token=EC-7DN22424UX202480U`.


```json
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?token=EC-7DN22424UX202480U',
  token: 'EC-7DN22424UX202480U' }
```

After the URL is modified we respond to the front-end app using the `res.json()` function.

```json
----------------------------------------------------------
----------        RESPONSE TO ANGULAR           ----------
----------------------------------------------------------
{"redirectUrl":"https://www.sandbox.paypal.com/checkoutnow?token=EC-7DN22424UX202480U","token":"EC-7DN22424UX202480U"}
```

The Angular directive, receives the response object, and initiates `paypal.checkout.startFlow(response.token);`.  This is when the In-Context window opens.

1. The user logs into PayPal.
2. The user clicks "Continue".
3. The user is returned to the return URL as specified in the `createPayment` call.

At this point the user is returned to `http://localhost:8000/return/#?paymentId=PAY-1CX117288G942581AK4LUQYA&token=EC-7DN22424UX202480U&PayerID=N9DBPUZ67JDBC`.  Angular will take the query params from the URL, and do a `POST` to the `/api/getPaymentDetails` endpoint.

```json
----------------------------------------------------------
--------------  PAYMENT DETAILS REQUEST  ----------------
----------------------------------------------------------
{"paymentId":"PAY-1CX117288G942581AK4LUQYA","token":"EC-7DN22424UX202480U","PayerID":"N9DBPUZ67JDBC"}
```

The API controller used the query params to run the `paypal.payment.get()` function.  The server then sends the details to the Angular App via the `res.json()` function.

```json
----------------------------------------------------------
--------------  PAYMENT DETAILS RESPONSE  ----------------
----------------------------------------------------------
{"id":"PAY-1CX117288G942581AK4LUQYA","intent":"sale","state":"created","cart":"7DN22424UX202480U","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://sandersx.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:8000/return/#?paymentId=PAY-1CX117288G942581AK4LUQYA","cancel_url":"http://localhost:8000/cancel/#"},"create_time":"2016-04-20T09:14:08Z","update_time":"2016-04-20T09:14:16Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-7DN22424UX202480U","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
```

At this point, Angular displays the information on the page in a simple table, with a button to "Execute Payment".  Upon the `click` of the "Execute Payment" button, the Payment Details object is sent to the front-end API service, to do a `POST` to `/api/executePayment`.

The `/api/executePayment`, runs the `paypal.payment.execute()` function to complete the payment.

```json
----------------------------------------------------------
---------------  EXECUTE PAYMENT REQUEST -----------------
----------------------------------------------------------
{"payer_id":"N9DBPUZ67JDBC"}
"PAY-1CX117288G942581AK4LUQYA"
```

The response is then sent back to Angular via the `res.json()` function.

```json
----------------------------------------------------------
---------------  EXECUTE PAYMENT RESPONSE ----------------
----------------------------------------------------------
{"id":"PAY-1CX117288G942581AK4LUQYA","intent":"sale","state":"approved","cart":"7DN22424UX202480U","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"9B517334XL4754429","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-1CX117288G942581AK4LUQYA","create_time":"2016-04-20T09:14:18Z","update_time":"2016-04-20T09:14:18Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/9B517334XL4754429","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/9B517334XL4754429/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-04-20T09:14:19Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-1CX117288G942581AK4LUQYA","rel":"self","method":"GET"}],"httpStatusCode":200}
```

Angular, then displays the information to the page in a simple table.

The payment is now complete.
