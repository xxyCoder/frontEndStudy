// 接口
interface Person {
    readonly name: string,  // 只读属性
    age?: number,   // 可选属性
    [propName: string]: any,    // 任意属性
    eat: Function
}
let tom: Person = {
    name: "tom",
    age: 21,
    eat: function () {
        console.log(this.name);
    }
}
// 数组
let nums1: number[] = [1, 2, 3, 4];
// 数组泛型
let nums2: Array<number> = [1, 2, 3, 4];
// 使用接口描述数组
interface IArray {
    [index: number]: any
}
let nums3: IArray = [1, 2, 3, 4];
// 类数组
interface IAsArray {
    [index: number]: any,
    length: number,
    callee: Function
}
function f() {
    let args: IAsArray = arguments;
}
// 定义函数类型
const sum1: (x: number, y: number) => number = function (x: number, y: number): number { return x + y };
function sum2(x: number, y: number): number { return x + y }
// 接口定义函数与可选参数
interface IFunction {
    (x: number, y: number, z?: number): number;
}
const sum3: IFunction = function (a: number, b: number): number { return a + b };