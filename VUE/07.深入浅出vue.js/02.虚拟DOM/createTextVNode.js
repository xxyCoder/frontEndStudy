import VNode from "./VNode";

export function createTextVNode(val) {
    return new VNode(undefined,undefined,undefined,String(val));
}

// ex: val = hello world