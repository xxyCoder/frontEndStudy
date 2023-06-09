// 布尔值
let isDone: boolean = true;
let isFinish: Boolean = new Boolean(false);
// 数值
let num: number = 1;
// 字符串
let str: string = "abc";
// 空值
function f(): void {
    console.log('fun');
}
// null undefined
let obj: null = null;
let value: undefined;
// any
let whatever: any = 666;
whatever = "123";
whatever = { a: 1, b: function () { console.log('b') } };
console.log(whatever.a);
// unknow
let something: unknown = 123;
something = "123";
something = { a: 1, b: function () { console.log('b') } };
console.log((something as { a: number }).a);
// 联合类型
let union: { a: 1, b: 'b' } | { a: 2, c: 'c' } = { a: 1, b: 'b'};