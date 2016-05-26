/*eslint-disable*/

var Express = require('express');
var cors = require('cors');
var webpack = require('webpack');

var webpackConfig = require('./development.config');
var compiler = webpack(webpackConfig);

var host = 'localhost';
var port = 3050;
var serverOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  stats: { colors: true },
};

var app = new Express();

app.use(cors({ origin: true, credentials: true }));
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s', port);
  }
});
