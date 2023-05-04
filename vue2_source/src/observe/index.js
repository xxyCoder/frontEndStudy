import { newArrayProto } from "./array";
import Dep from "./dep";

// 对于数组来说，不推荐使用索引当作key来劫持，存在a[10000] = 1这种写法，那么劫持非常耗费性能
class Observe {
    constructor(data) {
        this.dep = new Dep();   // 给所有对象都新增dep
        
        if (Array.isArray(data)) {
            // this是Observe的实例,同时给数据加标识，如果有属性表示该数据被监测过
            // data.__ob__ = this;
            // 但是要变成不可枚举的，不然在observe死循环
            Object.defineProperty(data,'__ob__',{
                value: this,
                enumerable: false
            });
            // 用户一般使用数组方法修改数组，那么重写这些方法去监控
            // data.__proto__ = {} 不推荐 直接重写，那么数组其他方法也没了
            data.__proto__ = newArrayProto;
            // 对数组中每一个值也要检测，万一是对象
            this.observeArray(data);
        } else {
            // Object.defineProperty 只能劫持存在的属性
            this.walk(data);
        }
    }
    walk(data) {    // 循环对象，对属性依次劫持
        // 重新定义属性，对性能有影响
        Object.keys(data).forEach(key => defineReactive(data, key, data[key]));
    }
    observeArray(data) {
        data.forEach(item => observe(item));
    }
}

function dependArray(value) {
    for(let i = 0;i < value.length;++ i) {
        value[i].__ob__ && value[i].__ob__.dep.depend();
        if(Array.isArray(value[i])) {
            dependArray(value[i]);
        }
    }
}

export function defineReactive(target, key, value) {
    let childOb = observe(value); // 对所有对象的属性进行劫持 使用递归
    let dep = new Dep();
    Object.defineProperty(target, key, {
        get() {
            if(Dep.target) {
                dep.depend();   // 让这个属性收集器记住当前的watcher
                if(childOb) {   // 让数组和对象本身也进行依赖收集
                    childOb.dep.depend();
                    if(Array.isArray(value)) {
                        console.log(value);
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) {    // 闭包，可以拿到value
                return;
            }
            value = newValue;
            dep.notify();   // 更新后通知，重新渲染
        }
    })
}

export function observe(data) {
    if (typeof data !== 'object' || data == null) { // typeof null = object 历史遗留问题
        return;    // 只对对象进行劫持
    }
    // 还需要判断一个对象是否被劫持过，劫持过就不需要重复劫持了，故需要添加一个实例来判断
    if(data.__ob__ instanceof Observe) {
        return data.__ob__;
    }
    return new Observe(data);
}