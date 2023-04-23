# 自定义命令
## vue2
1. 钩子函数
    - bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
    - inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    - update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新
    - componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
    - unbind：只调用一次，指令与元素解绑时调用。
2. 钩子函数传入的参数
    - el：指令所绑定的元素，可以用来直接操作 DOM。
    - binding：一个对象，包含以下 property：
        - name：指令名，不包括 v- 前缀。
        - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
        - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
        - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
        - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
        - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    - vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
    - oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

## vue3
1. 钩子函数
    - created 在绑定元素的 attribute 前或事件监听器应用前调用
    - beforeMount 在元素被插入到 DOM 前调用
    - mounted 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
    - beforeUpdate 绑定元素的父组件更新前调用
    - updated 在绑定元素的父组件及他自己的所有子节点都更新后调用
    - beforeUnmount 绑定元素的父组件卸载前调用
    - unmounted 绑定元素的父组件卸载后调用
2. 钩子函数传入的参数
    - 只有binding对象不同
        - value：传递给指令的值。例如在 v-my-directive="1 + 1" 中，值是 2。
        - oldValue：之前的值，仅在 beforeUpdate 和 updated 中可用。无论值是否更改，它都可用。
        - arg：传递给指令的参数 (如果有的话)。例如在 v-my-directive:foo 中，参数是 "foo"。
        - modifiers：一个包含修饰符的对象 (如果有的话)。例如在 v-my-directive.foo.bar 中，修饰符对象是 { foo: true, bar: true }。
        - instance：使用该指令的组件实例。
        - dir：指令的定义对象。
