# 组件
- 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
- data必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

# DOM模板解析注意事项
- 如果你想在 DOM 中直接书写 Vue 模板，Vue 则必须从 DOM 中获取模板字符串。由于浏览器的原生 HTML 解析行为限制，有一些需要注意的事项
1. 大小写区分
    - HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你使用 DOM 内的模板时，无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称还是 v-on 的事件名称，都需要转换为相应等价的 kebab-case (短横线连字符) 形式
    - ex:
        // JavaScript 中的 camelCase
        const BlogPost = {
        props: ['postTitle'],
        emits: ['updatePost'],
        template: `
            <h3>{{ postTitle }}</h3>
        `
        }
        <!-- HTML 中的 kebab-case -->
        <blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
2. 闭合标签
    - 在 DOM 模板中，我们必须显式地写出关闭标签
    - 这是由于 HTML 只允许一小部分特殊的元素省略其关闭标签
    - ex:
        <my-component /> <!-- 我们想要在这里关闭标签... -->
        <span>hello</span>
        
        <my-component>
        <span>hello</span>
        </my-component> <!-- 但浏览器会在这里关闭标签 -->

3. 
