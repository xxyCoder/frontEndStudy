# assert
- 该模块提供了断言测试函数
1. assert.deepEqual(actual,expected[,message])
    - 测试 actual 参数与 expected 参数是否深度相等。 原始值使用相等运算符（==）比较
    - 只测试可枚举的自身属性，不测试对象的原型、连接符、或不可枚举的属性
2. assert.deepStrictEqual(actual,expected[,message])
    - 与deepEqual大致相同
    - 原始值使用全等运算符（===）比较。Set 的值与 Map 的键使用 SameValueZero 比较。
    - 对象的原型也使用全等运算符比较。
    - 对象的类型标签要求相同。
    - 比较[对象包装器][]时，其对象和里面的值要求相同。
3. doesNotThrow(block[,error][,message])
    - 断言 block 函数不会抛出错误。
    - 当 assert.doesNotThrow() 被调用时，它会立即调用 block 函数。
    - 如果抛出错误且错误类型与 error 参数指定的相同，则抛出 AssertionError。 如果错误类型不相同，或 error 参数为    undefined，则抛出错误。
    - 如果抛出了 AssertionError 且有给 message 参数传值，则 message 参数的值会被附加到 AssertionError 的信息中
4. equal(actual,expected[,message])
    - 使用 == 比较
5. ifError(value)
    - 如果 value 不是 null，则抛出 value。 可用于测试回调函数的 error 参数。