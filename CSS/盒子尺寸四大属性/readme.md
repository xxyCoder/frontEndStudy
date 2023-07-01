# conten与替换元素
- 替换元素是使用标记元素来表示其内容的一种特殊类型的元素，默认有固定的外观和行为，其内容不直接由其内部的文本节点决定，而是由外部资源引入
  - 常见的有
  - <img>
  - <video>
  - <audio>
  - <object>
  - <iframe>
- content 几乎使用在伪元素中，其中的文字无法被选中，如同设置了user-select:none，其内容也是动态生成的，无法使用getComputedStyle获取