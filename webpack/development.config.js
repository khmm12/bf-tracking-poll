'use strict';
global.Promise = require('bluebird');

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const assetsPath = path.resolve(__dirname, '../public/assets/application/');

const assetsPluginInstance = new AssetsPlugin({ path: assetsPath, filename: 'assets.json' });
const isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools.config')).development();

const postcssCssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://localhost:3050/__webpack_hmr',
      'webpack/hot/only-dev-server',
      './src/client.shim.js',
      './src/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name].bundle.js',
    publicPath: 'http://localhost:3050/assets/',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss?sourceMap') },
      { test: /\.(woff|woff2|svg|ttf|eot)$/, loader: 'url?limit=10000' },
      { test: /\.(jpg|png)$/, loader: 'url?limit=1000' },
      {
        test: /\.js(x?)$/,
        loader: 'babel?cacheDirectory=true&plugins[]=react-hot-loader/babel',
        exclude: /(node_modules)/,
      },
    ],
  },
  postcss() {
     return [postcssCssnext, postcssNested];
  },
  resolve: {
    modulesDirectories: [
      'app',
      'node_modules',
    ],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    isomorphicToolsPlugin,
    assetsPluginInstance,
    new ExtractTextPlugin('styles.css'),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: process.env.NODE_ENV !== 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
};
