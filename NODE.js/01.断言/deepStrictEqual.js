const assert = require('assert');

// 1 !== '1'
// assert.deepStrictEqual({a: 1},{a: '1'});

const data = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate,Date.prototype);
// 标签不同
assert.deepStrictEqual(fakeDate,data);
assert.deepStrictEqual(object,fakeDate);
// 值相同
assert(new String('foo'),Object('foo'));