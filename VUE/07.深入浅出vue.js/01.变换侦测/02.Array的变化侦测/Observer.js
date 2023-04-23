import { arrayMethods } from "./arrayMethods";
import Dep from "./Dep";
import { observe } from "./observe";

// 检测__proto__是否可以使用
const hasProto = '__proto__' in {};
const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        def(value,'__ob__',this);

        if (Array.isArray(value)) {
            // 覆盖原型
            const augment = hasProto ? protoAugment : copyAugment;
            augment(value,arrayMethods,arrayKeys);
            // 递归其子数据，也形成响应式
            this.observeArray(value);
        }
        else {
            this.walk(value);
        }
    }
    walk(obj) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; ++i) {
            defineReactive(obj, keys[i], obj[keys[i]]);
        }
    }
    observeArray(items) {
        for(let i = 0;i < items.length;++ i) {
            observe(items[i]);
        }
    }
}

function protoAugment(target,src,keys) {
    target.__proto__ = src;
}

// 如果不存在，直接暴力设置
function copyAugment(target,src,keys) {
    for(let i = 0;i < keys.length;++ i) {
        const key = keys[i];
        def(target,key,src[key]);
    }
}

export function def(obj,key,val,enumerable) {
    Object.defineProperty(obj,key,{
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}