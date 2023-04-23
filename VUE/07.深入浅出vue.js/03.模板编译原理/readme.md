# 模板编译
- 模板 -----> 模板编译 ------> 函数渲染
- 主要目标是生成渲染函数
    - 先将模板解析成AST     解析器
        过滤解析器  解析过滤器
        文本解析器  解析带变量的文本
        HTML解析器  解析HTML标签
    - 遍历一遍AST，将所有静态节点做一个标记 优化器
        对于静态节点，每次重新渲染的时候，不需要创建新的虚拟节点，直接克隆
        在AST中找出所有静态节点并打上标记
        在AST中找出所有静态根节点打上标记
    - 使用AST生成渲染函数   代码生成器
        元素节点 createElement  _c
            _c(<tagname>,<data>,<children>)
        文本节点 createTextVNode    _v    
            如果是动态文本使用 text.expression ,静态使用text.text
        注释节点 createEmptyVNode   _e
            _e(${JSON.stringfy(comment.text)})
        字符串拼在with中返回给调用者
- 构建AST层级
    维护一个栈