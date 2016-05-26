'use strict';
global.Promise = require('bluebird');

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const assetsPath = path.resolve(__dirname, '../public/assets/application/');

const assetsPluginInstance = new AssetsPlugin({ path: assetsPath, filename: 'assets.json' });
const isomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools.config'));

const postcssCssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');

module.exports = {
  entry: {
    main: [
      './src/client.shim.js',
      './src/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].bundle.js',
    publicPath: '/assets/application/',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') },
      { test: /\.(woff|woff2|svg|ttf|eot)$/, loader: 'url?limit=10000' },
      { test: /\.(jpg|png)$/, loader: 'url?limit=1000' },
      {
        test: /\.js(x?)$/,
        loader: 'babel',
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
    isomorphicToolsPlugin,
    assetsPluginInstance,
    new ExtractTextPlugin('styles.css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: false,
      compress: {
        screw_ie8: true,
        drop_console: true,
        warnings: false,
      }
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: process.env.NODE_ENV !== 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
};
