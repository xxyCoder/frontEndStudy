# 什么是webpack
- 静态资源打包工具
- 会以一个或多个文件作为包的入口，将整个项目所有文件编译组合成一个或多个文件输出
# 功能
- 开发模式，仅能编译JS中的ES Module语法
- 生产模式，可以编译JS Module，还可以压缩JS代码
# 配置文件
- 使用webpack命令，会去查找webpack.config.js这个配置文件加载使用
# entry
- 依赖图的入口是entry，路径使用相对路径
- 单入口，适合单页面，只有一个入口文件
    - 字符串
    entry: './path/entry/index.js'
- 多入口，多页应用
    - 对象
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
    - 数组
    entry: ['./src/app.js','./src/adminApp.js']
    - 定义一个key，值为路径

# output
- 告诉webpack如何将编译后的文件输出到磁盘，path使用绝对路径
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
    {
        test: /\.(png|jpe?g|gif|svg)&/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'images/',  // 文件输出路径
            publicPaht: 'images/'   // 文件可访问的路径
        }
    }
- url-loader    处理图片、字体等打包，可以设置较小资源自动base64
    {
        test: /\.(png|jpe?g|gif|svg)&/,
        loader: 'url-loader',
        options: {
            limit: 1024,    // 小于该限制使用url-loader，大于该限制交给file-loader
            name: '[name].[ext]',
            outputPath: 'images/',  // 文件输出路径
            publicPaht: '/assets/'   // 文件可访问的路径
        }
    }
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
        - 字符串形式
            use: 'style-loader'
        - 数组形式
            use: ['style-loader','css-loader']
        - 对象形式
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024
                }
            }
    - 执行loader的顺序是链式调用，且方向是从右到左，右边解析完成传给左边的loader继续解析
## 资源模块
- 在webpack5的时候，内置模块替代了raw-loader、file-loader、url-loader
- asset/resource: 代表外部文件，并在构建输出中生成一个单独的文件。
- asset/inline: 代表外部文件，并将其转换为base64编码格式并内联到构建输出中。
- asset/source: 代表外部文件，并将其作为字符串导出。
- asset: 选择asset/resource或asset/inline之一，具体取决于资源文件大小的阈值。
{
    test: /\.(png|jpe?g|gif|webp|svg)$/,
    type: "asset",
    parser: {
        dataUrlCondition: {
            maxSize: 10 * 1024
        }
    }
}


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

# 补充CSS3前缀
- autoprefixer插件 搭配 postcss-loader使用
    test: /.css$/,
    use: [
        ...,
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer')({
                        browsers: ['last 2 version','>1%','ios 7']
                    })
                ]
            }
        }
    ]

# px转换rem
- px2rem-loader

# 静态资源内联
## CSS
- 借助style-loader
    use: [
        {
            loader: 'style-loader',
            options: {
                insertAt: 'top', // 样式插入head
                singleton: true // 将所有style标签合并成一个
            }
        }
    ]
- html-inline-css-webpack-plugin

# tree-sharking原理
- 它的原理是通过静态分析代码中的依赖关系，从而确定哪些代码块实际上被使用，哪些代码块可以安全地删除
- 利用ES6模块特点
    - 只能作为模块顶层语句出现
    - import模块名只能是字符串常量
    - import binding是immutable的

# 模块转换分析
- 被webpack转换后的模块会带一层包裹，打包出来的是一个IIFE（匿名闭包）
- import会转换成__webpack_require，该函数用来加载模块，并返回module.exports
- modules是一个数组，每一项都是一个模块初始化函数

# scope hoisting
- 它的目的是通过将模块中所有导入和导出的代码拼接到一个函数内部，从而减少了在浏览器中加载JavaScript模块时需要处理的代码文件数量
- 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当重命名一些变量防止冲突
- 可以减少函数声明代码和内存开销
- 在使用ES6模块时，每个文件都会被视为一个单独的模块，并且在浏览器中每个模块都需要单独进行处理。这意味着，在处理每个模块时，浏览器需要创建一个新的作用域，并将该模块的变量和函数添加到该作用域中。这样，如果您在多个模块中使用相同的变量或函数名称，则浏览器必须在每个模块中创建一个新的作用域来避免冲突。
- Scope Hoisting通过将所有模块代码合并到一个函数中，从而避免了这种冗余的作用域生成。这意味着浏览器只需要生成一个作用域，并将所有模块代码添加到该作用域中。这可以减少整体的代码大小，提高加载速度并降低运行时的内存占用。
- 支持ES6语法，CJS不支持

# 代码分割
- 抽离相同代码在一个共享块
- 脚本懒加载
## 方式
1. CommonJS：require.ensure()
2. ES6动态import（需要babel转换）
    {
        plugins: ["@babel/plugin-syntax-dynamic-import"]
    }

# sourcemap
1. 调试原始源代码
- 通过Sourcemap，开发人员可以在浏览器中直接调试源代码而不是打包后的代码。这意味着可以在Chrome DevTools或其他调试器中断点，并查看和编辑源文件中的内容。
2. 找到错误来源
- 当出现错误时，Sourcemap可以帮助开发人员快速定位错误源代码所在的位置，减少调试时间。
devtool: 'source-map'

# 基础库分离
- 将基础包通过cdn引入，不打入bundle中
- 使用html-webpack-externals-plugin
    new HtmlWebpackExternalsPlugin({
        externals: [
            {
                module: 'react',
                entry: '模块cdn路径',
                global: 'React'
            }
        ]
    })

# 分离公共页面资源
- SplitChunks插件
