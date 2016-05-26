import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import createStore from './redux/create';
import { Application } from './components';

// Grab the state from a global injected into server-generated HTML
let initialState = JSON.parse(window.__INITIAL_STATE__);
if (!__DEVELOPMENT__) {
  try {
    delete window.__INITIAL_STATE__;
    document.getElementById('initialState').remove();
  } catch (e) { }
}

const dest = document.getElementById('app');
const store = createStore({ initialState });

const component = (
  <Provider store={store}>
    <Application />
  </Provider>
);
ReactDOM.render(component, dest);

if (module.hot) {
  module.hot.accept('./components/Application', () => {
    const NextApp = require('./components').Application;
    const component = (
      <Provider store={store}>
        <NextApp />
      </Provider>
    );
    ReactDOM.render(component, dest);
  });
}
