export function eventsMixin(Vue) {
    Vue.prototype.$on = function(event,fn) {
        const vm = this;
        // 将依赖全部收集
        if(Array.isArray(event)) {
            for(let i = 0;i < event.length;++ i) {
                // 递归收集依赖
                this.$on(event[i],fn);
            }
        } else {
            // vm._events 是一个对象，用于存储事件，该对象在init的时候创建
            (vm._events[event] || (vm._events[event] = [])).push(fn);
        }
        return vm;
    }
    Vue.prototype.$once = function(event,fn) {
        const vm = this;
        function on() {
            vm.$off(event,on);
            fn.apply(vm,arguments);
        }
        on.fn = fn;
        vm.$on(event,on);
        return vm;
    }
    Vue.prototype.$off = function(event,fn) {
        const vm = this;
        // 没有任何参数则移除全部
        if(!arguments.length) {
            vm._events = Object.create(null);
            return vm;
        }
        // 如果是数组
        if(Array.isArray(event)) {
            for(let i = 0,l = event.length;i < l;++ i) {
                this.$off(event[i],fn);
            }
            return vm;
        }
        const cbs = vm._events[event];
        // 如果没有回调
        if(!cbs) {
            return vm;
        }
        // 只提供了事件名，则移除该事件的全部监听器
        if(arguments.length === 1) {
            vm._events[event] = null;
            return vm;
        }
        // 提供了事件名和回调
        if(fn) {
            let cb,i = cbs.length;
            while(i --) {
                cb = cbs[i];
                if(cb === fn || cb.fn === fn) {
                    cbs.splice(i,1);
                    break;
                }
            }
        }
        return vm;
    }
    Vue.prototype.$emit = function(event) {
        const vm = this;
        let cbs = vm._events[event];
        if(cbs) {
            const args = Array.prototype.slice.call(arguments,1);
            for(let i = 0,l = cbs.length;i < l;++ i) {
                try {
                    cbs[i].apply(vm,args);
                } catch(e) {
                    handleError(e,vm,`event handler for ${event}`);
                }
            }
        }
    }
}