var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',

    output: {
        path: path.resolve('dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },

    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: path.resolve('src')
    },

    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            PLAYGROUND: JSON.stringify({
                devMode: true,
                build: commonConfig.build,
                config: commonConfig.config
            })
        }),
        new BrowserSyncPlugin(
            {
                https: false,
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:3100/'
            },
            {
                reload: false
            }
        )
    ],

    devServer: {
        watch: true,
        https: false,
        inline: true,
        compress: true,
        port: 3100,
        historyApiFallback: true,
        stats: 'minimal',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: path.resolve('dist')
    }
});
