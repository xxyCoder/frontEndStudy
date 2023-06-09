# 响应式
- 对状态（即数据）修改时，视图（页面展示）会进行更新
## 渲染
- 从状态生成DOM，再输出到用户界面显示
## 变化侦测
- 其作用是侦测数据，当数据发送改变的时候，通知视图进行相应的更新
## 粒度
- 中等粒度，一个状态所绑定的不是一个具体的DOM节点，而是一个包含该节点的组件
- 变化之后，通知组件，组件内部可以使用虚拟DOM进行比对，从而降低依赖追踪所消耗的内存
1. 对象
## 追踪变化
- Object.defineProperty()
- 将一个普通对象传入vue实例对象作为data选项，vue将遍历此对象所有的property，并使用Object.defineProperty把所有属性转换为getter/setter
- getter/setter 用于追踪依赖
- 先将用到数据的地方收集起来，当数据发送改变的时候，依次触发这些地方，即在getter中收集依赖，setter中触发依赖
## Watcher
- 由于用的数据的地方很多，类型不一样，可能是模板，也可能是用户写的watch，需要抽象出处理这些情况的类
- 收集依赖只需要收集这个封装好的类的实例，通知也只需要通知该实例
- 数据发送变化的时候通知它，由它来通知其他地方
## 对象侦测
                      转换成getter/setter                         通知依赖        通知Watcher
- Data ---> Observer ---------------------> data getter setter  ----------> Dep ------------> Watcher

2. 数组
## 为什么不能像对象那样使用getter/setter的实现方式
- 对于数组可以使用该原型上的方法来修改，getter/setter不会被触发
- 通过覆盖原型方法来拦截原型方法
## 追踪
- 修改内容是通过方法，所以和对象追踪不一样，通过创建拦截器去覆盖原型的方式来追踪
- 在getter中收集依赖，在拦截器中触发依赖，故依赖收集存放在Observer实例对象上，这样getter和拦截器都可以访问到
- 访问数组的时候肯定会触发数组这个属性  
    list = [1,2,3]
    this.list
    