# conten与替换元素
- 替换元素是使用标记元素来表示其内容的一种特殊类型的元素，默认有固定的外观和行为，其内容不直接由其内部的文本节点决定，而是由外部资源引入
  - 常见的有
  - <img>
  - <video>
  - <audio>
  - <object>
  - <iframe>
- content 几乎使用在伪元素中，其中的文字无法被选中，如同设置了user-select:none，其内容也是动态生成的，无法使用getComputedStyle获取

# padding
- 对于内联元素，在垂直方向布局也有影响，视觉上并没有改变上一行和下一行内容间距
- 对于百分比，无论垂直还是水平都是相对宽度而言
  - 对于内联元素，padding会断行

# margin
- 只有元素是“充分可利用空间”状态的时候，margin才可以改变元素的可视区域
- 对于百分比，无论垂直还是水平都是相对宽度而言
- margin合并问题
  - 相邻兄弟元素
  - 父级和第一个/最后一个子元素
- margin合并计算
  - 正正取最大
  - 负负取最小
  - 正负则相加