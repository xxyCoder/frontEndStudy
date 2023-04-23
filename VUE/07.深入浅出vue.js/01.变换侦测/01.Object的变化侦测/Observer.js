import defineReactive from "./defineReactive";
// 将一个object中的所有属性转换成响应式的
export default class Observer {
    constructor(value) {
        this.value = value;
        // 只有object属性才会调用walk将每一个属性转换成getter/setter的形式调用
        if(!Array.isArray(value)) {
            this.walk(value);
        }
    }
    walk(obj) {
        const keys = Object.keys(obj);
        for(let i = 0;i < keys.length;++ i) {
            defineReactive(obj,keys[i],obj[keys[i]]);
        }
    }
}
