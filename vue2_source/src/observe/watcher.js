import Dep from "./dep";

let id = 0;

class Watcher {
    constructor(vm,fn,options) {
        this.id = id ++;    // 不同组件有不同watcher，故使用id标识
        this.renderWatcher = options;   // 是一个渲染watcher
        this.getter = fn;   // 调用该函数可以发送取值
        this.deps = []; // 实现计算属性和清理工作
        this.depsId = new Set(); // 去重，避免重复放置dep
        this.get();
    }
    addDep(dep) {
        let id = dep.id;
        if(!this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id);
            dep.addSub(this);
        }
    }
    get() {
        Dep.target = this;
        this.getter();
        Dep.target = null;
    }
    update() {
        this.get();
    }
}
/*
    需要给每个属性增加一个dep，目的是收集watcher
    一个属性对应多个组件，故一个dep对应多个watcher
    一个组件有多个属性，故一个watcher对应多个dep
    即多对多关系
*/
export default Watcher;