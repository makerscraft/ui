'use strict';

var debug = require('debug');
var notifier = require('node-notifier');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function (webpackConfig, options) {
    options = options || {};
    var NAME = webpackConfig.displayName || options.displayName;
    var PORT = webpackConfig.hotloadPort || options.hotloadPort || 8888;
    var HOST = "http://localhost:" + PORT;

    var log = debug('webpack:dev');
    var compiler = webpack(webpackConfig);

    compiler.plugin("done", function (stats) {
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
        publicPath: webpackConfig.output.publicPath,
        noInfo: true,
        hot: true,
        quiet: true
    });

    log("Starting");

    server.listen(PORT, 'localhost', function (err, result) {
        if (err) {
            log("Error:", err);
        }

        log("Listening on port " + PORT);
    });
}

