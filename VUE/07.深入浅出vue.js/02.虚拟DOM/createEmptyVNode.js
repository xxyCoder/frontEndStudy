import VNode from "./VNode"

// 创建注释节点
export const createEmptyVnode = text => {
    const node = new VNode();
    node.text = text;
    node.isComment = true;
    return node;
}
// <!-- 注释节点 -->    text = 注释节点