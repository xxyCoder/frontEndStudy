import { def } from "./Observer";

const arrayProto = Array.prototype;

// 使用arrayMethods去覆盖原型
export const arrayMethods = Object.create(arrayProto);
[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
    .forEach(function (method) {
        // 缓存原始方法
        const original = arrayProto[method];
        def(arrayMethods, method, function mutator(...args) {
            const result = original.apply(this, args);
            const ob = this.__ob__;
            let inserted;

            // 对于新增数据监测
            switch(method) {
                case 'push':
                case 'unshift': inserted = args;break;
                case 'splice':  inserted = args.slice(2); break;
            }
            if(inserted) {
                ob.observeArray(inserted);
            }
            ob.dep.notify();  
            return result;
        });
    })