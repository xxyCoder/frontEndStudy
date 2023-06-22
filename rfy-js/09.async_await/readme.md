# async和await
- 是generator的语法糖，不过内置了执行器
- 返回一个promise对象
- 任何一个await语句后面返回一个reject的promise，则整个函数都停止，使用try...catch包裹则不会影响后面函数

# 实现原理
- 就是将generator函数和自动执行器包裹在一个函数中