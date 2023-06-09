// 布尔值
var isDone = true;
var isFinish = new Boolean(false);
// 数值
var num = 1;
// 字符串
var str = "abc";
// 空值
function f() {
    console.log('fun');
}
// null undefined
var obj = null;
var value;
// any
var whatever = 666;
whatever = "123";
whatever = { a: 1, b: function () { console.log('b'); } };
console.log(whatever.a);
// unknow
var something = 123;
something = "123";
something = { a: 1, b: function () { console.log('b'); } };
console.log(something.a);
// 联合类型
var union = { a: 1, b: 'b' };
