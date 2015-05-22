'use strict';

module.exports = require('./webpack.defaults')({
    // options
    __dirname: __dirname,
    entry: ['./src/index.es6']
});