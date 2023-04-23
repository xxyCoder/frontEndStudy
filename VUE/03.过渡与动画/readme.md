# class切换
1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. v-enter-to：2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
4. v-leave：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. v-leave-to：2.1.8 版及以上定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

# 动画与过渡
- CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除

# 自定义过渡类名
- 他们的优先级高于普通的类名

# 钩子
- 在attribute中声明JS钩子  
    - 在transition属性上 v-on: before-enter
                              enter
                              after-enter
                              enter-cancelled
                              before-leave
                              leave
                              after-leave
                              leave-cancelled
    - 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。

# 初始渲染过渡
- 可以通过 appear attribute 设置节点在初始渲染的过渡
- 自定义类名
    - apear-class
    - apear-to-class
    - apear-active-class
- 自定义函数钩子
    - before-appear
    - appear
    - after-apear
    - apear-cancelled

# 过渡模式
mode: in-out|out-in
- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

# 渲染整个列表
- 对于使用v-for的可以使用transition-group
- 不同于 <transition>，它会以一个真实元素呈现：默认为一个 <span>。你也可以通过 tag attribute 更换为其他元素
- 过渡模式不可用，因为我们不再相互切换特有的元素
- 内部元素总是需要提供唯一的 key attribute 值
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身