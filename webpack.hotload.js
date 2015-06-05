'use strict';

var debug = require('debug');
var notifier = require('node-notifier');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function (webpackConfig, options) {
    options = options || {};

    var NAME = webpackConfig.displayName;
    var PORT = webpackConfig.hotloadPort;
    var PROTOCOL = options.https ? 'https' : 'http';
    var HOST = PROTOCOL + '://localhost:' + PORT;

    var log = debug('webpack:dev');
    var compiler = webpack(webpackConfig);

    compiler.plugin('done', function (stats) {
        var errors = stats.compilation.errors;
        errors.length &&  errors.forEach(function (error) {
            console.log(error.message);

            try {
                notifier.notify({
                    title: NAME + ' ' + error.module.rawRequest,
                    message: error.error.message.split(': ').join('\n')
                })
            } catch (e) { console.log(e.message) }
        });
    });

    var server = new WebpackDevServer(compiler, {
        contentBase: HOST,
        headers: { 'Access-Control-Allow-Origin': '*' },
        hot: true,
        https: !!options.https,
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });

    log('Starting');

    server.listen(PORT, 'localhost', function (err, result) {
        if (err) {
            log('Error:', err);
        }

        log('Listening at ' + HOST);
    });
}

