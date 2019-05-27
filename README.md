# marvel-explorer
Learn the details of your favourite Marvel superheroes!
[See it in action (with mocked data)](https://gndelia.github.io/marvel-explorer/)

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

However, if you don't have an API key, or it does not work, we got you back! We include by default a Mock json with some responses (superheroes from the letter "A" to "B"), so you can play with it until you get your public key working. Just leave the default value in the `.env` configuration file (that is, the generic message `<YOUR-KEY-HERE>`) and the mock list (which consist of 100 characters) will run for you.


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

## Production Setup

Our application is hosted in [Github Pages](https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom) using CRA.

In order to deploy with Github Pages, execute the following steps.

1. Configure your `homepage` in your `package.json` file

```javascript
// other fields
"homepage": "http://gndelia.github.io/marvel-explorer",
// more fields
```

In this case we will use my page but you can configure your own.

2 Configure your appropiate Marvel Public API key (or leave the default in order to use mocked data) and run the following command.

3. Set as a referred domain the domain where you're publishing. Otherwise you won't be able to hit the Marvel Api.

```
yarn deploy
```

Internally, the `build ` command will be run, which will create an optimized bundle  inside `/build` folder. And that's it! 

Another option if github pages is limited, is to serve it through a server. A basic one to begin with is [serve](https://github.com/zeit/serve).  
In order to use it, it is required to install it globally and then using the command `serve`

```
# install
yarn global add serve
# start our site
serve -s build/
```

And that's it ! Our site will start in port 80 (if you are running it locally, it will be in http://localhost)


**Note** If yarn fails to install serve, you can also use npm

```
npm install -g serve
```


## Relevant information during the development phase

- Marvel API page failed constantly. Although I was able to sign up and get a public Key, most of the times the [marvel main page](https://developer.marvel.com) was down, causing the documentation to be inaccessible, and the endpoints to fail. Furthermore, I never got my public key to work - as if was blocked from the beginning. I was able to mock most of the responses because [I came across](https://stackoverflow.com/a/52671487/1437934) a public key which, fortunately, had localhost as a referred domain added. However, after one day it stopped working. I tried different solutions to make the API work, from using a VPN, asking some friends to try, and contacting Marvel support. All actions were unsuccessful.   
Because of that, I left the mocked response as part of the repo, in case you don't have access either to an API key. That way, you will be able to try with a list of 100 characters. I hope it is enough.
- Because I was limited from the previous Public Key I found on the Internet, I did not have the Private key, being limited then to only use it from the browser side (according to the documentation, the private key is required to generate a hash). However, considering that the key is supposed to be public, it is "fine". If security was something to be considered, I would have made the requests from a backend, where the keys would be safer. That way, the Client App would hit the server as a middleware to retrieve all the information from Marvel API. That would only imply updating the MarvelApi.js (or the Fetch mock, if we assume we keep it), but for the rest of the application, it should be transparent.
- I did not use snapshot testing. Although it was a small project, the UI changed as I worked, and having to update snapshots every time would have taken too much time. I preferred to focus on Shallow testing with enzyme, which I feel closer to unit testing rather than using snapshots and/or mounting the entire component.
- Although I am aware of [react-router-redux](https://github.com/reactjs/react-router-redux), I did not use it because, as their readme states, it is deprecated. Considering it is a small project and only two urls were required, I did not use any integration at all. Although I admit that two layout components might be coupled with the router, I think that taking advantage of React's events to prepopulate state when loading a specific url, for this particular project, is fine. `react-router-redux` seems to recommend [connected-react-router](https://github.com/supasate/connected-react-router) but to be honest, I had no time to check it.
- I used [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) as a boilerplate to create the application because, well, I have used it and I like it. It works very well, and it let me focus on coding rather than fighting with too much configuration.
- Because my keys do not work, the demo deployed in https://gndelia.github.io/marvel-explorer/ is using the mocked data I've mentioned before.