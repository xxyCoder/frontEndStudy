// h()
export function createElementVNode(vm,tag,data,...children) {
    data ??= {};
    let key = data.key;
    if(key) {
        delete data.key;
    }
    return VNode(vm,tag,key,data,children);
}
// _v()
export function createTextVNode(vm,text) {
    return VNode(vm,undefined,undefined,undefined,undefined,text);
}

function VNode(vm,tag,key,data,children,text) {
    return {
        vm,
        tag,
        key,
        data,
        children,
        text
    };
}