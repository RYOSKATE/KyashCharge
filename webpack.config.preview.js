const path = require('path');
const merge = require('webpack-merge');
const devConfig = require('./webpack.config.dev.js');
module.exports = merge(devConfig, {
    serve: {
        content: path.resolve(__dirname, 'dist'),
        port: 3000,
    }
});