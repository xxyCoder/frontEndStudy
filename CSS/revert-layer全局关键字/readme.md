# revert
- 可以让当前CSS属性使用浏览器默认的值
# @layer
- 对于组件或者模块的CSS，我们可以全部写在 @layer 规则中，把自身的优先级降到底部
- 四种写法
    @layer layer-name {rules};
    @layer layer-name;
    @layer layer-name, layer-name, layer-name;
    @layer {rules};
- 降低外部文件优先级
    @import './xxx.css' layer;
    <link rel="stylesheet" href="xxx.css" layer>
- 嵌套layer
    外部优先级大于内部，也就是说每嵌套一层，优先级就下降一层
# revert-layer
- revert-layer可以让CSS属性值还原为上一层@layer中设置的同属性值，如果当前CSS不在@layer规则中，或者没有祖先@layer规则，则表现类似于revert关键字，使用浏览器默认的控件样式
- 类似层级恢复，向底层开始恢复