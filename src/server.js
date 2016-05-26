import express from 'express';
import http from 'http';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';

import createStore from './redux/create';
import Html from './helpers/html';
import { Application } from './components';
import { changeMood } from './redux/modules/moodPoll';

const app = express();
const server = new http.Server(app);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use((req, res, next) => {
  const moods = {
    '5': 'happy',
    '4': 'almosthappy',
    '3': 'neutral',
    '2': 'notsoangry',
    '1': 'angry',
  };
  req.mood = moods[req.query.v] || 'happy';
  next();
});
app.use((req, res) => {
  if (__DEVELOPMENT__) webpackIsomorphicTools.refresh();
  const userAgent = req.get('user-agent');
  global.navigator = userAgent;

  const store = createStore();
  store.dispatch(changeMood(req.mood));
  const component = (
    <Provider store={store}>
      <Application />
    </Provider>
  );
  const htmlMarkup = renderToStaticMarkup(
    <Html
      store={store}
      component={component}
      assets={webpackIsomorphicTools.assets()}
    />
  );
  global.navigator = '';
  return res.send(`<!doctype html>\n${htmlMarkup}`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, err => {
  if (err) {
    console.error(err);
  }
  console.info('==> Application started at', PORT);
});
