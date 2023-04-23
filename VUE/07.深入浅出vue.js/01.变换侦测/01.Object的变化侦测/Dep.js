// 解耦合
export default class Dep {
    constructor() {
        // 用于存储依赖
        this.subs = [];
    }
    // 添加依赖
    addSub(sub) {
        this.subs.push(sub);
    }
    // 移除依赖
    removeSub(sub) {
        remove(this.subs,sub);
    }
    // 收集依赖
    depend() {
        // 是一个Watcher实例对象
        if(window.target) {
            this.addSub(window.target);
        }
    }
    // 通知
    notify() {
        const subs = this.subs.slice();
        for(let i = 0,len = subs.length;i < len;++ l) {
            // 进行更新
            subs[i].update();
        }
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