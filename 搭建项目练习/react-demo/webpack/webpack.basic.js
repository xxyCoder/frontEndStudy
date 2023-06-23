const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basicConfig = {
    entry: path.resolve(__dirname, '../src/index.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader'
            },
            {
                test: /\.svg$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            path: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html',
            title: 'react app'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
        })
    ]
}

module.exports = {
    basicConfig
};