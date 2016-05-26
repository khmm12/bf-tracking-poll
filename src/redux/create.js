import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './modules/reducer';

export default function({ initialState } = {}) {
  const middleware = [];
  if (__CLIENT__ && __DEVELOPMENT__) middleware.push(require('redux-logger')());

  const _createStore = compose(
    applyMiddleware(...middleware),
    __CLIENT__ && __DEVELOPMENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
  )(createStore);
  const store = _createStore(reducer, initialState || {});
  return store;
}
