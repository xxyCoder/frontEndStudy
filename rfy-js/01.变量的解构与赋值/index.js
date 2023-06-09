// 数组解构
let [a, b, c, d] = [1, 2, 3];
console.log(a, d);
// 模式匹配
let [, bar, [baz]] = [1, [2], [3, 4]];
console.log(bar, baz);
let [, , f] = [1, 2, 3];
console.log(f);
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(tail);
// 不完全解构
let [x, y] = [1, 2, 3];
console.log(y);
// 允许赋初始值
let [u = x, v = 2, w = 1] = [1, null, undefined];
console.log(v, w);

// 对象解构
let { foo, uvw } = { bar: 'foo', foo: 'bar', uvw: function () { console.log(1) } };
console.log(foo);
uvw();

let obj = {
    p: [
        'Hello',
        { m: 'World' }
    ]
};
// 第二个p是模式
let { p, p: [n, { m }] } = obj;
console.log(p, n, m);
// 用圆括号包裹
let z;
({ z } = { z: 1 })
console.log(z);