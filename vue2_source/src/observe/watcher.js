import Dep, { popTarget, pushTarget } from "./dep";

let id = 0;

class Watcher {
    constructor(vm,fn,options) {
        this.id = id ++;    // 不同组件有不同watcher，故使用id标识
        this.renderWatcher = options;   // 是一个渲染watcher
        this.getter = fn;   // 调用该函数可以发送取值
        this.deps = []; // 实现计算属性和清理工作
        this.depsId = new Set(); // 去重，避免重复放置dep
        this.lazy = options.lazy;
        this.dirty = this.lazy
        this.vm = vm;  
        if(!this.lazy)    this.get();
    }
    addDep(dep) {
        let id = dep.id;
        if(!this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id);
            dep.addSub(this);
        }
    }
    evaluate() {
        this.value = this.get();    // 获取计算属性getter返回值
        this.dirty = false;
    }
    get() {
        pushTarget(this);
        const res = this.getter.call(this.vm);
        popTarget();
        return res;
    }
    update() {  // 异步更新
        queueWatcher(this); // 把当前watcher暂存
    }
    run() {
        this.get();
    }
}

let queue = [];
let hasW = new Set();
let pending = false;    // 防抖

function flushSchedulerQueue() {
    let flushQueue = queue.slice(0);
    pending = false;
    queue = [];
    hasW.clear();
    flushQueue.forEach(q => q.run());
}

function queueWatcher(watcher) {
    const id = watcher.id;
    if(!hasW.has(id)) {
        queue.push(watcher);
        hasW.add(id);
        
        if(!pending) {
            nextTick(flushSchedulerQueue);
            pending = true;
        }
    }
}

let callbacks = []; // 维护nextTick的回调方法，避免多个nextTick要开启多个定时器
let waiting = false;

function flushCallback() {
    let cbs = callbacks.slice(0);
    waiting = false;
    callbacks = [];
    cbs.forEach(cb => cb());
}

let timerFn;
if(Promise) {
    timerFn = () => {
        Promise.resolve().then(flushCallback);
    }
}
else if(MutationObserver) {
    let observer = MutationObserver(flushCallback);
    let textNode = document.createTextNode(1);
    observer.observer(textNode,{
        characterData: true
    });
    timerFn = () => {
        textNode.textContent = 2;
    }
} 
else if(setImmediate) {
    timerFn = () => {
        setImmediate(flushCallback);
    }
} 
else {
    timerFn = () => {
        setTimeout(flushCallback);
    }
}

export function nextTick(cb) {
    callbacks.push(cb);
    if(!waiting) {
        timerFn();
        // Promise.resolve().then(flushCallback);
        waiting = true;
    }
}
/*
    需要给每个属性增加一个dep，目的是收集watcher
    一个属性对应多个组件，故一个dep对应多个watcher
    一个组件有多个属性，故一个watcher对应多个dep
    即多对多关系
*/
export default Watcher;