# marvel-explorer
Learn the details of your favourite Marvel superheroes!

[![Build Status](https://travis-ci.com/gndelia/marvel-explorer.svg?branch=master)](https://travis-ci.com/gndelia/marvel-explorer) [![codecov](https://codecov.io/gh/gndelia/marvel-explorer/branch/master/graph/badge.svg)](https://codecov.io/gh/gndelia/marvel-explorer)

## Local Setup

1. Download the project
2. Run the following command to install dependencies
```
yarn install
```
3. Add your Marvel API key to your configuration file. Update the appropiate `.env` file like the following.  


```
REACT_APP_MARVEL_API_KEY=this-is-my-very-long-public-key
``` 

**You should only place your public key there.**
Check [Marvel Docs](https://developer.marvel.com/documentation/authorization) on how to setup your account. Essentialy, the steps are

a. Sign up  
b. Get the public key Marvel provides in your [profile account](https://developer.marvel.com/account).  
c. Add your referrer domain in your account. If you are developing locally, it will normally be `localhost`. If it is from a public url, add your domain as the referrer.   
Keep in mind that you can't add custom ports as part of the url referrer, so for your local environment you might want to consider using the standard port `80`. To do so, use the following command

```
./node_modules/.bin/cross-env PORT=80 && yarn start
```

If in doubt, check the section [Authentication for Client-Side Applications](https://developer.marvel.com/documentation/authorization)

However, if you don't have an API key, or it does not work, we got you back! We include by default a Mock json with some responses, so you can play with it until you get your public key working. Just leave the default value in the `.env` configuration file (that is, the generic message `<YOUR-KEY-HERE>`) and the mock list (which consist of 100 characters) will run for you.


4. Run the following command to start your application

```
yarn start
```

and voilá! You can navigate through the page


And your application should start! Navigate to http://localhost:3000/superheroes (or just http://localhost/superheroes if you used port 80)to explore your favourite superheroes!

### Useful commands

Consider the following useful commands for your development (available the `scripts` object in your `package.json`)

- Running the unit tests

```
yarn test
```

- Running the unit tests with the coverage reprt

```
yarn test:coverage
```

- Run linting analysis

```
yarn lint
```