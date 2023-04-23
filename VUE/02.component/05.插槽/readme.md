# 插槽
1. 具名插槽
    - name="xxx"
    - 一个不带 name 的 <slot> 出口会带有隐含的名字“default”
    - 在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令
        - v-slot 只能添加在 <template> 上
2. 具名插槽缩写
    v-slot: ==> #
    ex: v-slot:header ==> #header