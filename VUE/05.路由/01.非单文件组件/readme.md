# 组件
1. 定义组件
2. 注册组件
3. 使用组件
# 如何定义一个组件
- 使用vue.extend 与new Vue类似
- el不能写，最终组件都被一个vue管理，由vue中el决定服务哪个容器
- data必须写成函数，避免组件复用时，数据存在引用关系

# VueComponent
1. 组件本质是一个VueComponent的构造函数，由Vue.extend生成
2. 使用组件标签的时候，Vue解析的时候会帮我们创建一个实例对象，即 new VueComponent()
3. 每次调用vue.extend，返回的都是新的VueComponent，但是每个VueComponent实现都是一样的

# 内置关系
VueComponent.prototype.__proto__ === Vue.prototype
- 让组件实例对象可以访问到Vue原型的属性、方法