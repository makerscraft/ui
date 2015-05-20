'use strict';

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  options = options || {};

  var HOTLOAD = process.env.NODE_ENV === 'development';

  var loaders = {
    es6: {
      test: /\.(es6|jsx)$/,
      loaders: ['babel?stage=0'] },

    json: { test: /\.json$/, loaders: ['json'] },

    less: {
      test: /\.less$/,
      exclude: /\.useable\.less$/,
      loader:
        ExtractTextPlugin.extract(
          'css!autoprefixer!less', { publicPath: './static/build/' }) }
  }

  var webpackConfig = {
    cache: true,
    devtool: 'source-map',
    entry: ['./client/index.jsx'],
    module: {
      loaders: [
        loaders.es6,
        loaders.json,
        loaders.less] },
    output: {
      path: path.join(options.__dirname, '/static/build/'),
      publicPath: '/static/',
      filename: 'client.js' },
    plugins: [
      // Adds support for 'require(*.less)' from '.jsx' files
      new ExtractTextPlugin(
          'style', 'main.css', { disable: false, allChunks: true })],
    resolve: {
      extensions: ['', '.js', '.jsx', '.es', '.es6'],
      alias: {app: path.join(options.__dirname, "client")}
    },
    target: 'web'
  };

  if (HOTLOAD) {
    webpackConfig.devtool = 'eval-source-map'; // This is not as dirty as it looks. It just generates source maps without being crazy slow.
    webpackConfig.entry = [
      'webpack-dev-server/client?http://localhost:8888',
      'webpack/hot/dev-server',
      './client/index.jsx'
    ];

    webpackConfig.output.publicPath = 'http://localhost:8888/static/';
    loaders.es6.loaders = ['react-hot', 'babel?stage=0&optional=runtime'];
    loaders.less.loader = 'style!css!autoprefixer!less';

    webpackConfig.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ];
  }

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );

  return webpackConfig;
};
