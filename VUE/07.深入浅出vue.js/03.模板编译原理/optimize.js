export function optimize(root) {
    if(!root) {
        return ;
    }
    // 标记所有静态节点
    makeStatic(root);
    // 标记所有静态根节点
    makeStaticRoots(root);
}

function makeStatic(node) {
    node.static = isStatic(node);
    // 说明是元素节点
    if(node.type === 1) {
        for(let i = 0,l = node.children.length;i < l;++ i) {
            const child = node.children[i];
            makeStatic(child);
            // 静态子树的所有子节点必须是静态的
            if(!child.static) {
                node.static = false;
            }
        }
    }
}

function isStatic(node) {
    // 带变量的动态文本
    if(node.type === 2) {
        return false;
    }
    // 不带变量的纯文本
    if(node.type === 3) {
        return true;
    }
    // 那么剩下type = 1的情况
    return !!(node.pre || ( // 使用了v-pre 则必是静态节点
        !node.hasBindings && // 没有动态绑定
        !node.if && !node.for && // 没有v-if v-for
        !isBuildInTag(node.tag) && // 不是内置标签,即标签名不是slot 或者 component
        isPlatformReservedTag(node.tag) && // 不是组件标签
        !isDirectChildOfTemplateFor(node) &&    // 当前节点的父节点不能是带有v-for指令的template标签
        Object.keys(node).every(isStaticKey)    // 节点不存在动态属性
    ))
}

// 有一种情况,即使是静态根节点,也不会标记为静态根节点,因为优化成本大于收益成本
// 该情况是一个元素节点只有一个文本节点
function makeStaticRoots() {
    if(node.type === 1) {
        if(node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
            node.staticRoot = true;
            return ;
        } else {
            node.staticRoot = false;
        }
        if(node.children) {
            for(let i = 0,l = node.children.length;i < l;++ i) {
                makeStaticRoots(node.children[i]);
            }
        }
    }
}