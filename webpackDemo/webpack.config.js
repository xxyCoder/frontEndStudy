const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');   // 自动创建html不需要自己创建
const { DefinePlugin } = require('webpack') // 自定义常量

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        // assetModuleFilename: "images/[name].[hash:4][ext]"   // 扩展名会自动加点,但是会导致其他如字体资源也添加到这
    },
    module: {
        rules: [    // 每一条对象就是一个规则
            {
                test: /\.css$/,
                // use: [
                //     {
                //         loader: 'css-loader'
                //     }
                // ] 
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1    // 一旦执行到css-loader就不会回头去执行postcss-loader,但是又需要postcss-loader执行怎么办，使用该属性表示回头多少个loader
                    }
                }, 'postcss-loader']  // 执行顺序 从下往上或从右往左 
            },
            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     use: [{
            //         loader: 'file-loader',   // 将资源拷贝到指定目录，请求次数变大多
            //         options: {
            //             esModule: false, // 不转为esModule
            //             name: '[name].[hash:6].[ext]',  // 以原图片名，哈希值取前六位
            //             outputPath: 'images'    // 添加打包下的目录
            //         }
            //     }]
            // },
            // {
            //     test: /\.(png|svg|gif|jpe?g)$/,
            //     use: [{
            //         loader: 'url-loader',    // 将图片以base64 url加载到文件中，减少请求次数
            //         options: {
            //             esModule: false, // 不转为esModule
            //             name: '[name].[hash:6].[ext]',  // 以原图片名，哈希值取前六位
            //             outputPath: 'images'    // 添加打包下的目录
            //         }
            //     }]
            // }
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                /*
                    asset/resource ----> file-loader
                    asset/inline ------> url-loader
                    asset/source ------> raw-loader

                */
                type: 'asset/resource',
                generator: {
                    filename: "images/[name].[hash:4][ext]"
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:3][ext]'
                }
            },
            {
                test: /\.js$/,
                use: [
                    // {
                    //     loader: 'babel-loader',
                    //     options: {
                    //         plugins: [
                    //             '@babel/plugin-transform-arrow-functions',
                    //             '@babel/plugin-transform-block-scoping'
                    //         ],
                    //         presets: ['@babel/preset-env']
                    //     } 
                    // }
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ 
            title: 'html-webpack-plugin',
            template: './public/index.html'
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            name: 'common'
        }
    }
};