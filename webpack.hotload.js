'use strict';

var debug = require('debug');
var notifier = require('node-notifier');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

module.exports = function (webpackConfig) {
    var NAME = process.env.HAS_SKELETON_ENV || "peacock";
    var PORT = process.env.HOTLOAD_PORT || 8888; // lucky 8's
    var HOST = "http://localhost:" + PORT;

    var log = debug('webpack:dev');
    var compiler = webpack(webpackConfig);

    compiler.plugin("done", function (stats) {
        var errors = stats.compilation.errors;
        errors.length &&  errors.forEach(function (error) {
            console.log(error.message);

            try {
                notifier.notify({
                    title: error.module.rawRequest.replace('.', process.env.APP_NAME),
                    message: error.error.message.split(': ').join('\n')
                });
            } catch (e) { console.log(e.message); }
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

