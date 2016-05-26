import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import pick from 'lodash/pick';

const Html = ({ assets, component, store }) => {
  const content = component ? renderToString(component) : '';
  const head = Helmet.rewind();
  const initialState = JSON.stringify(store.getState());
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        <link href={assets.styles.main} rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div
          id="app"
          className="react-app-wrapper"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <script
          id="initialState"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)};`,
          }}
        />
        <script src={assets.javascript.main} />
      </body>
    </html>
  );
};

export default Html;
