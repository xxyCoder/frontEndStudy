let str: string = "xxx";
// 通过tsconfig.json 改变严格模式才能将Null和Undefined赋值给void
let v1: void = null;
let v2: void = undefined;

console.log(str);