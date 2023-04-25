import { compileToFunction } from "./compiler/index.js";
import { mountComponent } from "./lifecycle.js"
import { initState } from "./state";

export function initMixin(Vue) {   // 给Vue增加init方法
    Vue.prototype._init = function (options) {   // 用于初始化
        const vm = this;
        // 如果扩展了其他方法，也需要拿到options的话，就考虑将options放在实例上
        vm.$options = options;
        // 初始化状态
        initState(vm);

        if(options.el) {    // 说明用户传递了el
            vm.$mount(options.el);  // 实习数据挂载
        }
    }
    Vue.prototype.$mount = function(el) {
        const vm = this;
        el = document.querySelector(el);
        let ops = vm.$options;
        if(!ops.render) {   // 没有渲染函数
            let template;
            if(!ops.template && el) {   // 也没有模板，但是有el,说明用户在body区域写了HTML标签
                template = el.outerHTML;
            } else {
                if(el) {    // 说明用户在template处写了HTML标签
                    template = ops.template;    
                }
            }
            if(template) {
                const render = compileToFunction(template);
                ops.render = render;
            }
        }
        mountComponent(vm,el); // 挂载实例
    }
}