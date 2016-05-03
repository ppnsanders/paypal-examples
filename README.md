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

1. Run NPM install from the `/paypal-examples` directory.

```
$ npm install
```

2. Run `install.js`

```
$ node install.js
```

You should see all of the examples get installed, similarly to this:

```
ExpressInContext NPM Packages Installed.....
ExpressInContext Installed!
HapiInContext NPM Packages Installed.....
AngularAppInContext/server NPM Packages Installed.....
SimpleExpressServer NPM Packages Installed.....
SimpleExpressServer Installed!
HapiInContext bower Packages Installed.....
HapiInContext Installed!
KrakenInContextAngular NPM Packages Installed.....
KrakenInContext NPM Packages Installed.....
KrakenInContextAngular bower Packages Installed.....
KrakenInContextAngular Installed!
KrakenInContext bower Packages Installed.....
KrakenInContext Installed!
AngularAppInContext/client NPM Packages Installed.....
AngularAppInContext/client Bower Packages Installed.....
AngularAppInContext Installed!
```