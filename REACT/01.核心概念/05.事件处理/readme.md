# 事件处理
1. 事件采用小驼峰命名
2. 使用JSX语法时传入一个函数作为事件处理函数，而不是一个字符串

# this
1. 在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。
    - 使用bind
    - 使用箭头函数
        - 箭头函数被赋值
        - 箭头函数中调用原函数

# 传递参数
