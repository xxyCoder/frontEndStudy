# 节点
- document 表示每个文档的根节点
    根节点唯一子元素是html
- 每个节点都有nodeType表示节点类型
    对于元素而言，nodeName表示标签名，而nodeValue表示null
- 每个节点都有childNodes,其中包含nodeList实例
    nodeList是一个类数组
    该属性包含所有子节点，即有元素、文本节点、注释节点等
- 每个节点都有parentNode属性
- previousSibling 和 nextSibling表示当前节点的前一个和后一个节点，如果没有则为null
- hasNodes 判断是否有子节点
- 共享属性 ownerDocument 属性代表整个文档节点

## 操作节点
- appendChild(插入节点) 用于childNodes列表末尾添加节点
- insertBefore(插入节点，节点位置) 没有节点位置或为null，与appendChild一样 
- replaceChild(插入节点，替换节点)  
- removeChild(删除节点位置)
- cloneNode(boolean) 复制节点，如果为true表示深复制
- normalize 处理文档子树中的文本节点
    检测其后代节点 如果发现空文本则删除，如果有两个文本节点相邻则合并成一个文件节点

## 文档类型
- nodeType 9 
- nodeName #document
- nodeValue parentNode ownerDocument null
- documentElement指向html
    document.documentElement
- body 指向body
    document.body
- doctype
    document.doctype 指向doctype属性
- title
    document.title 指向title，只读，修改无效
- write() writeln()   文档写入
- open close 打开和关闭网页输出流

## Element类型
- nodeType 1
- nodeName 标签名
- nodeValue null
- tagName 返回大写标签名
### 操作属性
- 属性名不区分大小写
- getAttribute()
    style属性 得到的是字符串 DOM访问的时候是一个对象
    事件处理程序 得到的是字符串形式源代码 DOM对象访问是一个函数
- setAttribute()
    在DOM元素上添加自定义属性，不会自动将其变成元素的属性
    使用该方法会将属性值规范为小写形式
- removeAttribute()
### attributes
- Element类型是唯一使用该属性的DOM节点，包含一个NameNodeMap实例，一个类似NodeList的实时集合，元素每一个属性都表示为Attr一个节点
- getNamedItem(name) 返回nodeName为name的节点
- removeNamedItem(name) 删除nodeName属性等于name的节点
- setNamedItem(node) 向列表添加node，以nodeName为索引
- item(pos) 获取位置为pos的节点 
### 创建元素
- document.createElement()  接受一个参数，即要创建元素的标签名

## 文本节点
- nodeType 等于3
- nodeName 为 #text
- nodeValue为包含的文本
- 不支持子节点
### 操作方法
- 新插入的文本节点之间没有空格
- appendData(text)
- deleteData(offset,count) 从offset位置开始删除count个字符
- insertData(offset,text) 在位置offset插入text
- replaceData(offset,count,text) 用text替换从offset位置到offset+count的文本
- splitText(offset) 在offset位置处拆分成两个节点
    截断之后原文本包含开头到偏移位置前的文本
    返回一个剩下的文本节点
- substringData(offset,count) 提取从位置offset到offset+count的字符
- document.createTextNode() 创建文本节点，接受一个参数表示要插入节点的文本
