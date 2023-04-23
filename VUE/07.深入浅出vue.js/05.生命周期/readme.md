# 生命周期
1. new Vue 
2. 初始化 Events & LifeCycle
3. beforeCreate() 钩子函数
4. 初始化 injections & reactivity
5. created 钩子函数
6. 没有el 选项 是否触发mount 
    有el选项 是否有template选项
        有template 获取模板
        没有 通过el获取模板
7. 编译成渲染函数
8. beforeMount 钩子函数
9. 创建vm.$el 并替换el
10. mounted 挂载
11. 状态变化时 beforeUpdate 此时数据更新，但是页面没更新
12. 使用虚拟DOM 重新渲染
13. update 数据与视图一致
14. destroy调用时
15. 卸载最终依赖、子组件与事件监听器
16. destroy 卸载完成