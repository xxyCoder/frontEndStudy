const mount = Vue.prototype.$mounted;   
Vue.prototype.$mounted = function(el) { // 函数劫持
    el = el && query(el);   // 没有传递el，则为undefined
    const options = this.$options;
    if(!options.render) {   // 如果给了render函数，则template无效
        // 将模板编译成渲染函数并赋值给options.render
        let template = options.template;
        if(template) {
            if(typeof template === 'string') {
                if(template.charAt(0) === '#') {    // 被当作选择符
                    template = idToTemplate(template);
                } 
                // 用户自己设置的模板 直接使用

            } else if(template.nodeType) {  // DOM元素
                template = template.innerHTML;
            } else {    
                if(process.env.NODE_ENV !== 'production') {
                    warn('..');
                }
                return this;
            }
        } else if(el) { // 
            template = getOuterHTML(el);    // 如果没有给模板，则根据el获取模板
        }
    }
    // 编译
    if(template) {
        const { render } = compileToFunctions(
            template,
            {...},
            this
        )
        options.render = render;
    }
    return mount.call(this,el);
}

// el 参数支持元素类型或字符串类型的选择器
function query(el) {
    if(typeof el === 'string') {
        const selected = document.querySelector(el);
        if(!selected) {
            return document.createElement('div');   // 没有获得，则自己创建一个空div元素
        }
        return selected;
    }
    else {
        return el;
    }
}

function getOuterHTML(el) {
    if(el.outerHTML) {
        return el.outerHTML;
    } else {
        const container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

function idToTemplate(id) {
    const el = query(id);
    return el && el.innerHTML;
} 

function compileToFunctions(template,options,vm) {
    options = extend({},options);

    // 缓存
    const key = options.delimiters ? String(options.delimiters) + template : template;
    if(caches[key]) {
        return cache[key];
    }

    const compiled = compile(template,options);
}