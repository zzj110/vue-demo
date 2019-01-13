"use strict"

const path = require('path')

module.exports = {
    dev: {
        // paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        proxyTable: {},

        host: 'localhost',
        port: 9526, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: false,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: 'cheap-source-map',
        cssSourceMap: false

    },
    build: {

        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         * 所有现代浏览器都支持gzip压缩并会为所有HTTP请求自动协商此类压缩。启用gzip压缩可大幅度减所传输
         * 的响应大小，从而显著缩短下载响应资源所需的时间、减少客户端流量消耗并加快网页的首次呈现速度
         *
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
        productionGzip: true,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
