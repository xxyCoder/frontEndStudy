const { merge } = require('webpack-merge');
const { basicConfig } = require('./webpack.basic')

module.exports = merge(basicConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        host: 'localhost',
        port: 300,
        hot: true,
        open: true
    }
})