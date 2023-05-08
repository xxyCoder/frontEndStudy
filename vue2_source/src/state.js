import Dep from "./observe/dep.js";
import { observe } from "./observe/index.js";
import Watcher, { nextTick } from "./observe/watcher.js";

export function initState(vm) {
    // 将数据拿出来，进行数据劫持
    const ops = vm.$options;
    if(ops?.data) {  // 如果给了数据
        initData(vm);
    }
    if(ops?.computed) {  // 如果有计算属性
        initComputed(vm);
    }
    if(ops?.watch) {
        initWatch(vm);
    }
}
function initWatch(vm) {
    let watch = vm.$options.watch;
    for(let key in watch) {
        const handler = watch[key]; // 可以是字符串 数组 函数 
        if(Array.isArray(handler)) {
            for(let i = 0;i < handler.length;++ i) {
                createWatcher(vm,key,handler[i]);
            }
        } else {
            createWatcher(vm,key,handler);
        }
    }
}
function createWatcher(vm,key,handler) {
    if(typeof handler === 'string') {
        handler = vm[handler];
    }
    return vm.$watch(key,handler);
}
function proxy(vm,target,key) {
    Object.defineProperty(vm,key,{
        get() {
            return vm[target][key]; // vm._data.xxx
        },
        set(newValue) {
            if(vm[target][key] === newValue) {
                return ;
            }
            vm[target][key] = newValue;
        }
    })
}
function initData(vm) {
    let data = vm.$options.data;    // 在vue2中，可能是函数也可能是对象
    data = typeof data === 'function' ? data.call(vm) : data; // 是函数就执行，不是则直接赋值
    vm._data = data;    // 跟踪data，因为data被单独拿出来了，data被监听或是其他的vm不知道
    // 数据劫持，vue2使用了defineProperty
    observe(data);  // 此处修改data在Vue上体现不出，需要定义_data = data
    // 将vm._data 使用vm代理，因为用户访问数据使用vm._data较为麻烦
    for(let key in data) {
        proxy(vm,'_data',key);
    }
}
function initComputed(vm) {
    const watchers = vm._computedWatchers = {}; // 即计算属性watcher保存在vm上
    const computed = vm.$options.computed;
    for(let key in computed) {
        let userDef = computed[key];
        const getter = typeof userDef === 'function' ? userDef : userDef.get;
        
        watchers[key] = new Watcher(vm,getter,{lazy: true});    // 将属性和watcher对应
        defineComputed(vm,key,userDef);
    }
}
function defineComputed(target,key,userDef) {
    const setter = userDef.set || (() => {});
    Object.defineProperty(target,key,{
        get: createComputedGetter(key),
        set: setter
    });
}
function createComputedGetter(key) { // 检测是否执行，即缓存结果
    return function() { // this是target 即vm
        const watcher = this._computedWatchers[key];
        if(watcher.dirty) {
            // 如果是脏的 调用用户getter
            watcher.evaluate();
        }
        if(Dep.target) {    // 计算属性出栈后还要渲染watcher 要让计算属性收集上一层watcher
            watcher.depend();
        }
        return watcher.value;
    }
}
export function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick;
    Vue.prototype.$watch = function(expOrFn,cb) {
        new Watcher(this,expOrFn,{user:true},cb);  // this是vm,因为是vm调用
    }
}