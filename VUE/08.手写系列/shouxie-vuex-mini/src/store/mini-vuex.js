import { reactive,inject } from "vue";
// 定义常量，方便使用且拼写不易出错
const STORE_KEY = '__store__';

function useStore() {
    return inject(STORE_KEY);
}

class Store {
    constructor(options) {
        // 构成响应式，数据发送变化的时候内部也变化
        this._state = reactive({
            // 在vuex中state是函数，执行函数之后将返回值也就是对象赋值给data
            data: options.state()
        });
        this._mutations = options.mutations;
    }
    // 读取state的时候直接返回state.date
    get state() {
        return this._state.data;
    }
    // 用于触发mutations
    commit = (type,playload) => {
        const entry = this._mutations[type];
        entry && entry(this.state,playload);
    }
    // main.js 使用 use的时候必须提供install方法
    install(app) {
        app.provide(STORE_KEY,this);
    }
}

function createStore(options) {
    return new Store(options);
};

export { createStore,useStore };