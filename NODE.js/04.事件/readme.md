# events
- 所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象开放了一个 eventEmitter.on() 函数，允许将一个或多个函数绑定到会被对象触发的命名事件上。 事件名称通常是驼峰式的字符串，但也可以使用任何有效的 JavaScript 属性名。

# emit
- 允许将任意参数传给监听器函数
- 调用函数是function
    - 当一个普通的监听器函数被 EventEmitter 调用时，标准的 this 关键词会被设置指向监听器所附加的 EventEmitter
- 调用函数是箭头函数
    -  this 关键词就不再指向 EventEmitter 实例

# 同步与异步
- EventEmitter 会按照监听器注册的顺序同步地调用所有监听器
- 监听器函数可以使用 setImmediate() 或 process.nextTick() 方法切换到异步操作模式

# 只调用一次
- once() 方法时可以注册一个对于特定事件最多被调用一次的监听器

# defaultMaxListeners
- 单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变。
- 所有 EventEmitter 实例的默认值可以使用 EventEmitter.defaultMaxListeners 属性改变。 如果这个值不是正数, 那将抛出 TypeError错误
- 设置 EventEmitter.defaultMaxListeners 要谨慎，因为会影响所有 EventEmitter 实例，包括之前创建的