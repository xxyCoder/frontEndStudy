import Watcher from "./observe/watcher.js";
import { createElementVNode, createTextVNode } from "./vdom/index.js";
import { patch } from "./vdom/patch.js";

export function initLifycycle(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this,el = vm.$el;
        vm.$el = patch(el,vnode);    // 既有初始化的功能，又有更新的功能
    };
    // _c(tag,{},child)
    Vue.prototype._c = function() {
        return createElementVNode(this,...arguments);
    };
    // _v(text)
    Vue.prototype._v = function() {
        return createTextVNode(this,...arguments);
    };
    Vue.prototype._s = function(value) {
        return JSON.stringify(value);
    };
    Vue.prototype._render = function() {
        // 让with中的this指向实例
        return this.$options.render.call(this);   // 通过ast语法转义后生成的render方法
    };
}

export function mountComponent(vm,el) {
    vm.$el = el;
    // 1. 调用render方法产生虚拟DOM
    const updateComponent = () => {
        vm._update(vm._render());
    };
    new Watcher(vm,updateComponent,true);   // true标识渲染过程
    // 2. 根据虚拟DOM产生真实DOM
    // 3. 插入到el元素中
}