const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
import { basicConfig } from './webpack.basic'

module.exports = merge(basicConfig, {
    mode: "production",
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
})