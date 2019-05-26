import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import store from './Store/ConfigureStore';
import App from './Layout/App';
import * as serviceWorker from './serviceWorker';

const basename = '/superheroes';

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory({ basename })}>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
