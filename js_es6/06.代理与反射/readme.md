# 代理
- 由Proxy构造函数创建
- Proxy.prototype是undefined，因此不能使用instanceof
- 代理与目标对象，属性值访问同一个值
- 可以用全等区别代理对象和目标对象
## 拦截器
- get 拦截对象属性的读取
- set 拦截对象属性的设置    
    如果某个属性不可以写，那么set对该属性代理无效
- has 拦截 propKey in proxy操作
    虽然for...in 也使用了in ，has对其没有效果
- deleteProperty 拦截delete proxy[property]
    返回false则属性无法被删除
- apply 拦截proxy实例作为函数的调用 proxy(...args) proxy.call(object,...args) ....
- construct 拦截proxy实例作为构造函数的操作 new proxy(...args) 
    注意不是new Proxy，且返回必须是一个对象，且this指向不是实例对象而是handler
## this指向
- 在代理情况下，目标对象和代理对象内部this指向不一致

# 反射
- Reflect对象和Proxy对象的方法一一对应
- 都是静态方法，可以使用类名直接调用
    - get 如果有receiver 则this绑定到receiver
    - set 如果传入了receiver，会触发Proxy.defineProperty拦截，这是因为receiver指向的是proxy实例对象
        没有传入则不会被proxy.defineProperty