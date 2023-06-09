function createElm(vnode) {
    let { tag, data, children, text } = vnode;
    if (typeof tag === 'string') {   // 标签
        vnode.el = document.createElement(tag); // 将真实节点和虚拟节点对应
        patchProps(vnode.el, {}, data);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    } else {
        vnode.el = document.createTextNode(text);
    }
    return vnode.el;
}

function patchProps(el, oldProps = {}, props = {}) {
    // 旧节点有样式，新节点没有，则删除
    let oldStyle = oldProps.style || {};
    let newStyle = props.style || {};
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }
    // 对比新旧属性
    for (let key in oldProps) {
        if (!props[key]) {
            el.removeAttribute(key);
        }
    }

    for (let key in props) {    // 使用新的覆盖旧的
        if (key === 'style') {
            for (let styleName in props[key]) {
                el.style[styleName] = props.style[styleName];
            }
        } else {
            el.setAttribute(key, props[key]);
        }
    }
}

export function patch(oldVNode, VNode) {
    const isRealElement = oldVNode.nodeType;
    if (isRealElement) {
        const elm = oldVNode;   // 获取真实元素
        const parentElm = elm.parentNode;   // 拿到父元素
        let newElm = createElm(VNode);
        parentElm.insertBefore(newElm, elm.nextSibling);
        parentElm.removeChild(elm); // 删除老节点
        return newElm;
    } else {
        return patchVNode(oldVNode, VNode);
    }
}

function isSameVnode(vnode1, vnode2) {
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key;
}

function patchVNode(oldVNode, VNode) {
    // 1. 两个节点不同标签，直接删除旧节点，换新节点
    // 2. 是相同节点 （判断节点tag和key）继续比较属性是否有差异（复用老节点，更新差异）
    // 3. 继续比较子节点
    if (!isSameVnode(oldVNode, VNode)) {
        // 用父亲节点来操作子节点
        let newNode = createElm(VNode);
        oldVNode.el.parentNode.replaceChild(newNode, oldVNode);
        return newNode;
    }
    let el = oldVNode.el; // 复用老节点元素
    if (!oldVNode.tag) { // 是文本
        if (oldVNode.text !== VNode.text) {
            el.textContent = VNode.text;    // 更新文本内容
        }
    }
    // 是标签
    patchProps(el, oldVNode.data, VNode.data);
    // 比较儿子节点
    // 1. 一方有子节点，一方没有
    // 2. 两方都有子节点
    let oldChildren = oldVNode.children || [];
    let newChildren = VNode.children || [];
    if (oldChildren.length > 0 && newChildren.length > 0) {
        updateChildren(el, oldChildren, newChildren);
    } else if (newChildren.length > 0) {
        mountChildren(el, newChildren);
    } else if (oldChildren.length > 0) {
        el.innerHTML = '';  // 可以循环删除
    }
    return el;
}
function mountChildren(el, newChildren) {
    for (let i = 0; i < newChildren.length; ++i) {
        let child = newChildren[i];
        el.appendChild(child);
    }
}
function updateChildren(el, oldChildren, newChildren) {
    // vue2采用双指针比较
    let oldStartIndex = 0;
    let newStartIndex = 0;
    let oldEndIndex = oldChildren.length - 1;
    let newEndIndex = newChildren.length - 1;

    // 前前 前后 后前 后后比较
    let oldStartVNode = oldChildren[0];
    let newStartVNode = newChildren[0];
    let oldEndVNode = oldChildren[oldEndIndex];
    let newEndVNode = newChildren[newEndIndex];
    function makeIndexByKey(children) {
        let map = {};
        children.forEach((child,index) => {
            map[child.key] = index;
        });
        return map;
    }
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if(!oldStartVNode) {
            oldStartVNode = oldChildren[++ oldStartIndex];
            continue;
        } 
        if(!oldEndVNode) {
            oldEndVNode = oldChildren[-- oldEndIndex];
            continue;
        }
        // 前前比较
        if (isSameVnode(oldStartVNode, newStartVNode)) {
            patchVNode(oldStartVNode, newStartVNode);
            oldStartVNode = oldChildren[++oldStartIndex];
            newStartVNode = newChildren[++newStartIndex];
        }
        // 后后比较
        else if (isSameVnode(oldEndVNode, newEndVNode)) {
            patchVNode(oldEndVNode, newEndVNode);
            oldEndVNode = oldChildren[--oldEndIndex];
            newEndVNode = newChildren[--newEndIndex];
        }
        // 交叉对比
        else if (isSameVnode(oldEndVNode, newStartVNode)) {
            patchVNode(oldEndVNode, newStartVNode);
            oldEndVNode = oldChildren[--oldEndIndex];
            newStartVNode = newChildren[newStartIndex++];

            el.insertBefore(oldEndVNode.el, oldStartVNode.el);   // 将尾旧节点移到头旧节点前
        }
        else if (isSameVnode(oldStartVNode, newEndVNode)) {
            patchVNode(oldStartVNode, newEndVNode);
            el.insertBefore(oldStartVNode.el, oldEndIndex.el.nextSibling);
            oldStartVNode = oldChildren[++oldStartIndex];
            newEndVNode = newChildren[--newEndIndex];
        }
        // 乱序比对 
        else {
            let moveIndex = map[newStartVNode.key];
            if(moveIndex !== undefined) {
                let moveVNode = oldChildren[moveIndex];
                el.insertBefore(moveVNode.el,oldStartVNode.el);
                oldChildren[moveIndex] = undefined; // 表示已经移动到正确位置了
                patchVNode(moveVNode,newStartVNode);
            } else {
                el.insertBefore(createElm(newStartVNode),oldStartVNode.el); // 没有就创建真实节点插入
            }
            newStartVNode = newChildren[++ newStartIndex];
        }
    }

    if (newStartIndex <= newEndIndex) {  // 有新节点，插入
        for (let i = newStartIndex; i <= newEndIndex; ++i) {
            let childEl = createElm(newChildren[i]);    // 将虚拟节点转换为真实节点并插入
            let anchor = newChildren[newStartIndex + 1] ? newChildren[newStartIndex + 1].el : null;
            el.insertBefore(childEl, anchor);
        }
    }

    while (oldStartIndex <= oldEndIndex) {   // 多余旧节点，删除
        if(oldChildren[oldStartIndex])    el.removeChild(oldChildren[oldStartIndex].el);
        ++ oldStartIndex;
    }
}