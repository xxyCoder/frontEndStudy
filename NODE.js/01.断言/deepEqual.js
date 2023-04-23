const assert = require('assert');
const obj1 = {
    a: {
        b: 1
    }
};
const obj2 = {
    a: {
        b: 2
    }
};
const obj3 = {
    a: {
        b: 1
    }
};
const obj4 = Object.create(obj1);
const obj5 = {
    a: 1
};
assert.deepEqual(obj1, obj3);
assert({a: 1},{a: '1'});
// 断言成功，接着往下走
console.log('true');
// b属性不同
// assert.deepEqual(obj1,obj2);  
console.log(obj4);
console.log(obj4.__proto__);
// 不测试原型
assert.deepEqual(obj1,obj4);