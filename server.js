/*eslint-disable*/

if (process.env.NODE_ENV !== 'production') {
  require('babel-core/register');
}
// Async/await, yield support
require('babel-runtime/regenerator');
require('babel-polyfill');
// Blurbird promises
global.Promise = require('bluebird');
require('babel-runtime/core-js/promise').default = require('bluebird');
require('bluebird').config({
  warnings: false,
});

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

global.navigator = {
  userAgent: '',
};

const path = require('path');
const rootDir = __dirname;

if (__DEVELOPMENT__) {
  if (require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.png|\.scss$)/i,
  })) {
    bootstrap();
  }
} else {
  bootstrap();
}

function bootstrap() {
  global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/isomorphic-tools.config.js'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./src/server');
  });
}
