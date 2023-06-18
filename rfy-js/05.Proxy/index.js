let p1 = new Proxy({}, {
    get: function (target, propKey, receiver) {
        return receiver;
    },
    set: function (target, propKey, value) {
        console.log(propKey);
        target[propKey] = value;
    }
});

let o1 = Object.create(p1);
o1.age = 21;
console.log(o1.time);
console.log(o1.age);
console.log(p1.time);

let o2 = {
    a: 1,
    b: {
        c: 2,
        d: [1, 2, 3, [6, 7, [9]]]
    }
}
// 深度监听
const handler = {
    get(target, key) {
        console.log(key, 'get');
        if (typeof target[key] === 'object') {
            return new Proxy(target[key], handler);
        }
        return Reflect.get(target, key);
    },
    set(target, key, value) {
        console.log(key, 'set');
        Reflect.set(target, key, value);
    }
}
let p2 = new Proxy(o2, handler);

console.log(p2.b.c);
console.log(p2.b.d[3][0]);

// 监听数组
console.log('----------------------------');
let arr = [1, 2, 3, 4, [5, 6, 7]];
let p3 = new Proxy(arr, {
    get: function (target, propKey, receiver) {
        console.log(propKey, 'get');
        if (propKey === 'push') {

        }
        Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(propKey, 'set');
        Reflect.set(target, propKey, value, receiver);
    }
});

p3[1] = 10;
p3[4][1] = 5;
// p3.push(666);  需要proxy重写该方法

// 取消代理
const target1 = {};
const handler1 = {};
let { proxy1, revoke } = Proxy.revocable(target1, handler1);