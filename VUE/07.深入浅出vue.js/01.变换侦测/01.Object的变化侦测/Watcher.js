import parsePath from "./parsePath";
export default class Watcher {
    constructor(vm,expOrFn,callBack) {
        this.vm = vm;
        this.getter = parsePath(expOrFn);
        this.callBack = callBack;
        // 会触发getter，然后收集该依赖
        this.value = this.get();
    } 
    get() {
        window.target = this;
        let value = this.getter.call(this.vm,this.vm);
        window.target = undefined;
        return value;
    }
    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.callBack.call(this.vm,this.value,oldValue);
    }
}