# 实例方法
- vm.$watch vm.$set vm.$delete
    在stateMixin中挂载道Vue原型上
- vm.$on vm.$once vm.$off vm.$emit
    在eventsMixin中挂载在Vue原型上
- vm.$mount vm.$forceUpdate vm.$nextTick vm.$destroy
    forceUpdate 和 destroy 在lifecycleMixin中挂载在Vue的prototype上
    nextTick是在renderMixin中挂载在Vue的prototype上
    mount是跨平台的代码上挂载
## 异步更新队列
- Vue.js的实现方式是将通知的watcher实例添加道队列中缓存起来，并在添加到队列之前检查其中是否存在相同的watcher，只有不存在的时候才将watcher实例添加到队列中，然后在下一次事件循环中，才会触发队列中的事件并清空队列
- 保证了同一个状态多次发送改变，最后只是渲染一次
