# attributes 继承
- 传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器
- 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上
- 透传进来的可以通过 $attrs 访问到
- 透传 attributes 在 JavaScript 中保留了它们原始的大小写

# attributes 禁用
- inheriAttrs: false
    - 通过这个可以将透传进来的属性不绑定在根元素，而是有选择的绑定在内部元素，v-bind="$attrs"