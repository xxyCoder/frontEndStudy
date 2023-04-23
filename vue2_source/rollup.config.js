import babel from 'rollup-plugin-babel'
// rollup 默认可以导出一个对象，作为打包的配置文件
export default {
    input: './src/index.js',
    output: {
        file: './dist/vue.js',
        name: 'Vue',
        format: 'umd',  // 打包模块 umd (commonJs amd)
        sourcemap: true // 希望可以调试源代码
    },
    plugins: [
        babel({
            exclude: "node_modules/**"  // 排除node_modules所有文件夹下的所有文件
        })
    ]
}