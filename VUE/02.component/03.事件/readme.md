# 自定义事件
- 事件名不存在任何自动化的大小写转换
- 事件名不会被用作一个 JavaScript 变量名或 property 名，所以就没有理由使用 camelCase 或 PascalCase 了。并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 v-on:myEvent 将会变成 v-on:myevent——导致 myEvent 不可能被监听到。
## $listeners
- Vue 提供了一个 $listeners property，它是一个对象，里面包含了作用在这个组件上的所有监听器。
- 配合v-on="$listeners"将所有的事件监听都指向这个组件的某个特定子元素
## .sync修饰符
- 对一个 prop 进行“双向绑定”。