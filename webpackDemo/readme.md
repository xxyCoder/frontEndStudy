# entry
- 依赖图的入口是entry
- 单入口，适合单页面，只有一个入口文件
    - 字符串
    entry: './path/entry/index.js'
- 多入口，多页应用
    - 对象
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
    - 定义一个key，值为路径

# output
- 告诉webpack如何将编译后的文件输出到磁盘
- 单入口配置
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    }
- 多入口配置
    entry: {
        ...
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname,'dist')
    }
    - 占位符确保名称唯一

# loaders
- webpack只支持JS和JSON两种文件类型，通过loaders去支持其他文件类型并且把它们转换为有效的模块，并且添加到依赖图中
- 本身是一个函数，接受源文件作为参数，返回转换结果
## 常用loaders
- babel-loader  转换ES6、ES7等JS新特性
- css-loader    支持.css文件加载和解析
- less-loader   支持.less文件加载和解析
- ts-loader     将TS转换成JS
- file-loader   进行图片、字体等打包
- url-loader    处理图片、字体等打包，可以设置较小资源自动base64
- raw-loader    将文件以字符串形式导入
- style-loader  将样式通过<style>标签插入到head中
- thread-loader 多进程打包JS和CSS
## 使用方式
    module: {
        rules: [
            {
                test: 正则匹配,
                use: 'xxx-loader',
                或者
                use: [
                    'xx1-loader','xx2-loader'
                ]
            }
        ]
    }
    - test指定匹配规则
    - use指定使用的loader
    - 执行loader的顺序是链式调用，且方向是从右到左，右边解析完成传给左边的loader继续解析

# plugins
- 增强webpack功能，用于bundle文件的优化，资源管理和环境变量注入
- 作用于整个构建过程
## 常用plugins
- CommonsChunkPlugin    将chunks相同的代码块提取成公共JS
- CleanWebpackPlugin    清理构建目录
- ExtractTextWebpackPlugin  将CSS从bundle文件里提取成一个独立的CSS文件
- HtmlWebpackPlugin 创建HTML去承载输出bundle.js
- ZipWebpackPlugin  将打包的资源压缩成一个zip包
- UglifyjsWebpackPlugin 压缩JS
## 使用方式
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        ...
    ]

# mode
- 指定当前构建的环境，production、development、none
- 设置不同的mode，可以开启webpack中不同的内置函数

# 文件监听
- 启动命令 webpack --watch
- 配置webpack.config.js 设置 watch: true

# 热更新 webpack-dev-server
- WDS不刷新浏览器，不输出文件，而是放在内存中
- 使用webpack内置插件 HotModuleReplacementPlugin

# 文件指纹
- 打包输出的文件名的后缀
- Hash
    和整个项目构建相关，只要有项目文件有更改，整个项目构建的hash值就会变化
    对于图片文件设置file-loader的name
        use: [{
            loader: 'file-loader',
            options: {
                name: 'img/[name][hash:8].[ext]'
            }
        }]
- Chunkhash
    和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
    对于JS文件设置output的filename
        output: {
            filename: '[name][chunkhash:8].js',
            path: 'xx'
        }
- Contenthash
    根据文件内容来定义hash，文件内容不变则contenthash不变
    对于CSS文件，设置MiniCssExtractPlugin的filename
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name][contenthash:8].css'
            })
        ]

# 代码压缩
- JS压缩
    uglifyjs-webpack-plugin
- css压缩
    optimize-css-assets-webpack-plugin
    同时使用cssnano预处理器
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
    ]
- html压缩
    html-webpack-plugin
    