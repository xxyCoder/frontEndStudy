export function removeVnodes(vnodes,startIdx,endIdx) {
    for(;startIdx <= endIdx;++ startIdx) {
        const ch = vnodes[startIdx];
        if(isDef(ch)) {
            removeNode(ch.elm);
        }
    }
}

const nodeOps = {
    removeChild(node,child) {
        node.removeChild(child);
    },
    parentNode(el) {
        return el.parent;
    }
};

function removeNode(el) {
    const parent = nodeOps.parentNode(el);
    if(isDef(parent)) {
        nodeOps.removeChild(parent,el);
    }
}