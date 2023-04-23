# v-on
-  用于监听DOM事件
# $event
- 有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法
# 事件修饰符
    .stop 阻止事件传播，但是本身可以触发
    .prevent 提交事件不再重载页面
    .capture 捕获模式，先从父级，然后再是内部触发，内部使用了stop无效，父级仍然会触发含税
    .self 只当在 event.target 是当前元素自身时触发处理函数
    .once 点击事件将只会触发一次 
    .passive 不等待回调直接触发，提升了性能
        passive与prevent不能一起使用，因为 .passive 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 .prevent 会被忽略，并且浏览器会抛出警告。
- 可以串联
    - .stop.once

# 常见键盘事件 按键别名
- 配合着keyup keydown使用
    1. enter 回车
    2. delete 删除
    3. esc 退出
    4. space 空格
    5. tab 比较特殊，必须配合keydown，当keyup的时候光标已经离开
    6. up
    7. down
    8. left
    9. right
- 系统修饰键 ctrl alt shift meta
    1. 配合keyup，按下系统修饰键的时候要配合着其他键钮然后松开其他键
    2. 配合keydown，正常执行
