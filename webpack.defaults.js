'use strict';

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  options = _.defaults({}, options, {
    __dirname: __dirname,
    displayName: 'TUI',
    entry: ['./client/index.jsx'],
    hotloadPort: process.env.HOTLOAD_PORT || 8888
  });

  options.output = _.defaults({}, options.output, {
    publicPath: '/static/',
    filename: 'client.js'
  });

  options.output.path =
    path.join(options.__dirname, options.output.publicPath + '/build/')

  var HOTLOAD = process.env.NODE_ENV === 'development';

  var loaders = {
    es6: {
      test: /\.(es6|jsx)$/,
      loaders: ['babel?stage=0'] },

    json: { test: /\.json$/, loaders: ['json'] },

    less: {
      test: /\.less$/,
      loader:
        ExtractTextPlugin.extract(
          'css!autoprefixer!less', { publicPath: './static/build/' }) },

    markdown: {
      test: /\.md$/,
      loaders: 'html!remarkable'}
  }

  var webpackConfig = {
    // Hotload Specific Config
    displayName: options.displayName,
    hotloadPort: options.hotloadPort,

    // Standard Webpack Config
    cache: true,
    devtool: 'source-map',
    entry: options.entry,
    module: {
      loaders: [
        loaders.es6,
        loaders.json,
        loaders.less,
        loaders.markdown] },
    output: {
      path: path.join(options.__dirname, options.output.publicPath + '/build/'),
      publicPath: options.output.publicPath,
      filename: options.output.filename },
    plugins: [
      // Adds support for 'require(*.less)' from '.jsx' files
      new ExtractTextPlugin(
          'style', 'main.css', { disable: false, allChunks: true })],
    remarkable: {
      preset: 'full',
      html: true
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.es', '.es6'],
      alias: {app: path.join(options.__dirname, 'client')}
    },
    target: 'web'
  };

  if (HOTLOAD) {
    webpackConfig.devtool = 'eval-source-map'; // This is not as dirty as it looks. It just generates source maps without being crazy slow.
    webpackConfig.entry = [
      'webpack-dev-server/client?http://localhost:' + webpackConfig.hotloadPort,
      'webpack/hot/dev-server',
    ].concat(webpackConfig.entry);

    webpackConfig.output.publicPath = 'http://localhost:' +
                                        webpackConfig.hotloadPort +
                                        webpackConfig.output.publicPath;
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
