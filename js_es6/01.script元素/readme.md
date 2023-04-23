# script元素
## 属性值
    - async 表示应该立即下载脚本，但不能阻止其他页面的动作，只对外部脚本有效
    - crossorign 配置相关请求的CORS（跨域资源共享）设置，默认不使用
        crossorign="anonymouse" 配置文件不必设置凭据标志
        crossorign="use-credentials" 设置凭据标志
    - defer 表示先下载，但脚本可以延迟到文档完全被解析和显示之后执行，只对外部脚本有效
    - src 要执行代码的外部文件位置，可以和包含它的HTML不在同一域中
    - type 代替language 表示代码块中脚本语言类型
        始终是"text/javascript"
        设置为module 内部被当成es6模块，可以使用 import export关键字 
## 打印script
    - 代码中不能出现</script>，当浏览器解析的时候，看见</script>会将其当成结束的</script>，即便在字符串内
    - 避免该问题需要转义

## 使用src且script内部有JS代码
    - 如果两者都提供，则行内JS代码会被忽略

## 执行顺序
    - 浏览器会按照script在页面中出现的顺序依次解释它们，后者必须等前者解释完，如果没有defer和async的话
    - 如果将script放在head中，那么必须先下载、解析、解释后script才能渲染页面
    - 使用了defer的脚本，延迟执行也是按原顺序
    - 使用了async的脚本，会立即开始下载，但是顺序不能保证按次序执行
