# BOM
- window对象，表示浏览器的实例
- 所有通过var声明的都会变成window对象的属性和方法 
    let const声明则不会

## 窗口
- screenLeft screenTop 表示窗口相对于屏幕左边和顶部的位置
- innerWidth innerHeight 浏览器视口大小（不包含浏览器边框和工具栏） outerWidth outerHeight  浏览器自身大小
- document.documentElement.clientWidth document.clientHeight 返回视口的宽度和高度
    标准模式使用documentElement 否则使用body

## 视口
- window.pageXoffset window.scrollX 文档相对于视口移动的水平距离
- window.pageYoffset window.scrollY 文档相对于视口移动的垂直距离
- scroll() scrollTo() scrollBy() 滚动页面 都接受两个参数表示水平和垂直

## 导航
- window.open 导航到指定的url
    其返回值是个对象，有close方法关系新页面

## location对象
- hash #部分
- host 服务器名+端口
- hostname  服务器名
- port 端口
- pathname 路径名
- href 完整的url
- search ?部分
- assign() 修改地址

## history
- go(num) 负数表示后退，正确表示前进
- back()
- forward()