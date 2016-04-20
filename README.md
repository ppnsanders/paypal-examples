# PayPal NodeJS Examples

## How to use these examples

1. Fork or Clone this Repo.

```
git clone https://github.com/ppnsanders/paypal-examples.git
```

2. Create a new directory called `/data` in the root directory.
3. In the `/data` directory, create a file called `config.json`
4. Put your credentials in the file like this:

```json
{
	"client_id": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"client_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Using the specific examples.

First, change directory to the example you want to see. 

> e.g. `cd SimpleExpressServer`

Now follow these steps:

1. `$ npm install`
2. `$ node app.js`
3. Open your browser to `http://localhost:3000/` or `http://localhost:8000` for the Kraken examples.

Your terminal will output the logs of the data as it progresses through the various steps.

