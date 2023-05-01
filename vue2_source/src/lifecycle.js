import Watcher from "./observe/watcher.js";
import { createElementVNode, createTextVNode } from "./vdom/index.js";

function createElm(vnode) {
    let { tag,data,children,text } = vnode;
    if(typeof tag === 'string') {   // 标签
        vnode.el = document.createElement(tag); // 将真实节点和虚拟节点对应
        patchProps(vnode.el,data); 
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}

function patchProps(el,props) {
    for(let key in props) {
        if(key === 'style') {
            for(let styleName in props[key]) {
                el.style[styleName] = props.style[styleName];
            }
        } else {
            el.setAttribute(key,props[key]);
        }
    }
}

function patch(oldVNode,VNode) {
    const isRealElement = oldVNode.nodeType;
    if(isRealElement) {
        const elm = oldVNode;   // 获取真实元素
        const parentElm = elm.parentNode;   // 拿到父元素
        let newElm = createElm(VNode);
        parentElm.insertBefore(newElm,elm.nextSibling);
        parentElm.removeChild(elm); // 删除老节点
    }
}

export function initLifycycle(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this,el = vm.$el;
        patch(el,vnode);    // 既有初始化的功能，又有更新的功能
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
    const w = new Watcher(vm,updateComponent,true);   // true标识渲染过程
    console.log(w);
    // 2. 根据虚拟DOM产生真实DOM
    // 3. 插入到el元素中
}