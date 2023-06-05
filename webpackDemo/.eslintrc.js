module.exports = {
    // 解析选项
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    },
    // 具体检查规则
    rules: {
        "no-var": 2 // 不能使用var变量
    },
    // 继承其他规则
    extends: [
        "eslint:recommend"
    ],
    env: {
        node: true,
        browser: true
    }
}