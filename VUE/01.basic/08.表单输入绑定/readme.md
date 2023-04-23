# 表单输入绑定
- 可以使用v-model实现双向数据绑定，它会根据控件类型自动选取正确的方法来更新元素
    - v-model本质是语法糖，负责监听用户的输入事件以更新数据
    text 和 textarea 元素使用 value property 和 input 事件；
    checkbox 和 radio 使用 checked property 和 change 事件；
    select 字段将 value 作为 prop 并将 change 作为事件。
- 在文本区域插值 (<textarea>{{text}}</textarea>) 并不会生效，应用 v-model 来代替。
- 单个复选框，绑定到布尔值
- 多个复选框，绑定到数组
- 单选
    如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。

# 修饰符
- lazy
    v-model 在每次 input 事件触发后将输入框的值与数据进行同步
- number
    自动将用户的输入值转为数值类型
- trim
    自动过滤用户输入的首尾空白字符

