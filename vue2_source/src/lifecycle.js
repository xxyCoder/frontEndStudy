export function initLifycycle(Vue) {
    Vue.prototype._update = function() {};
    Vue.prototype._render = function() {};
}

export function mountComponent(vm,el) {
    // 1. 调用render方法产生虚拟DOM
    vm._update(vm._render());
    // 2. 根据虚拟DOM产生真实DOM
    // 3. 插入到el元素中
}