export function lifecycleMixin(Vue) {
    Vue.prototype.$forceUpdate = function() {
        const vm = this;
        if(vm._watcher) {
            wm._watcher.update();
        }
    }
    // 销毁一个实例
    Vue.prototype.$destroy = function() {
        const vm = this;
        if(vm._isBeginDestroyed) {
            return ;
        }
        callHook(vm,'beforeDestroy');
        // 防止重复销毁
        vm._isBeginDestroyed = true;
        // 删除自己与父级的连接
        const parent = vm.$parent;
        if(parent && !parent._isBeginDestroyed && !vm.$options.abstract) {
            remove(parent.$children,vm);
        }
        // 删除所有状态依赖
        if(vm._watcher) {
            vm._watcher.teardown();
        }
        let i = vm._watchers.length;
        while(i --) {
            wm._watchers[i].teardown();
        }
        vm._isDestroyed = true;
        // 在vnode树上解绑
        vm.__patch__(vm.node,null);
        callHook(vm,'destroyed');
        // 移除所有监听器
        vm.$off();
    }
}   
function remove(arr,item) {
    if(arr.length) {
        const index = arr.indexOf(item);
        if(index > -1) {
            return arr.splice(index,1);
        }
    }
}