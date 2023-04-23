export default class VNode {
    constructor(tag,data,children,text,elm,context,componentOptions,asyncFactory) {
        // 无效属性设置为undefined 或 false
        this.tag = tag; // 元素节点名称
        this.data = data;       // 节点的数据，比如class、style等
        this.children = children;   // 子节点
        this.text = text;   // 元素文本
        this.elm = elm;
        this.context = context; // 当前组件的Vue.js实例
        this.componentOptions = componentOptions;   // 对于组件节点来说，组件节点的参数选项
        this.asyncFactory = asyncFactory;  

        this.ns = undefined;
        this.functionalContext = undefined; // 函数式组件的实例
        this.functionalOptions = undefined; // 函数式组件的参选选项
        this.functionalScopeId = undefined;
        this.componentInstance = undefined; // 组件的实例，也是Vue.js的实例
        this.asyncMeta = undefined;

        this.key = data && data.key;
        this.raw = false;
        this.isStatic = false;  // 是否是静态节点
        this.isRootInstance = true;
        this.isComment = false; // 是否是注释节点
        this.isClone = false;   // 是否是克隆节点
        this.isOnce = false;
        this.isAsyncPlaceholder = false;
    }

    get child() {
        return this.componentInstance;
    }
}