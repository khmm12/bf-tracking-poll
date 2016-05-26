// Async/await, yield support
require('babel-runtime/regenerator');
require('babel-polyfill');
// Blurbird promises
window.Promise = require('bluebird');
require('babel-runtime/core-js/promise').default = require('bluebird');
require('bluebird').config({
  warnings: false,
});
