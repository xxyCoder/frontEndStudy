# vuex
- 存储是响应式的
## state
- 每个应用将仅仅包含一个 store 实例，从store中获取实例可以使用计算属性
- 但是直接使用store会导致导包频繁，Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。且子组件能通过 this.$store 访问到
### mapState辅助函数
- 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余
    1. 计算属性只有mapState的时候 computed: mapState({} | []) 可以是对象或数组 
    2. 计算属性还有局部情况 computed: {
        localComputed() {}
        ...mapState({} | [])
    }

## getter
- 相当于组件中的计算属性，接收state作为第一个参数，其他getters作为第二个参数
- 访问方式
    - 使用store.getters.xxx 属性访问，有缓存
    - 使用store.getters.xxx(args) 方法访问，没有缓存
### mapGetters 辅助函数
- 仅仅是将 store 中的 getter 映射到局部计算属性，与mapState一样

## Mutation
- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
- 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
- 触发一个类型为 type 的 mutation 时，调用此函数
- 要唤醒一个 mutation 处理函数，你需要以相应的 type 调用 store.commit 方法
- 提交方式
    mutations: {
        increment(state,otherArgs) {}
    }
    1. store.commit('increment',otherArgs| {otherArgs: xxx})
    2. store.commit({
        type: 'increment',
        otherArgs: xxx
    })
- 必须是同步函数

## Action
- 类似于Mutation，但是可以完成异步操作
- 使用Action提交Mutation，即将store.commit放入action对应的函数中
- 分发action  store.dispatch('xxx')
### mapActions
- 辅助函数将组件的 methods 映射为 store.dispatch 调用

## Module
- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿
- store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块
- 默认情况下，模块内部的 action 和 mutation 仍然是注册在全局命名空间的——这样使得多个模块能够对同一个 action 或 mutation 作出响应
- 具有更高的封装度和复用性，通过添加 namespaced: true 的方式使其成为带命名空间的模块
    - 调用方式： 模块名/方法名|属性名
    - 启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit，也就是在使用模块内容时不需要在同一模块内额外添加空间名前缀
    - 使用全局 state 和 getter，rootState 和 rootGetters 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action
    - 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
    - 若需要在带命名空间的模块注册全局 action，你可添加 root: true
        actions: {
            xxx: {
                root: true,
                handler(namespaceContext,args) {}
            }
        }
- 在 store 创建之后，你可以使用 store.registerModule 方法注册模块
    store.registerModule('xxx',{})  'xxx'
    store.registerModule(['xx1','xx2',{}])  'xx1/xx2'
- store.unregisterModule(moduleName) 来动态卸载模块
### 带命名空间绑定
- 对于重复解析相同模块的，可以将模块的命名空间字符串作为第一个参数
- 也可以使用createNamespacedHelpers创建基于某个命名空间辅助函数
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')