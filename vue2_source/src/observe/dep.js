let id = 0;
class Dep {
    constructor() {
        this.id = id ++;
        this.subs = []; // 存放当前属性对应的watcher有那些
    }
    depend() {
        // this.subs.push(Dep.target);
        Dep.target.addDep(this);    // 让watcher记住dep
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}
Dep.target = null;  // 如何将watcher和dep关联？暴露一个全局属性

let stack = [];
export function pushTarget(watcher) {
    stack.push(watcher);
    Dep.target = watcher;
}
export function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
}
export default Dep;