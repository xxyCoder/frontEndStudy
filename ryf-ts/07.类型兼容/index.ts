interface Named {
    name: string;
}
let x: Named;
let y = { name: "xxy", age: 21 };
x = y;

// 对比函数
let a = (n: number) => 0;
let b = (n: number, s: string) => 0;

b = a;
// a = b;

// 比较类
class Animal {
    feet: number;
    static type: string;
    constructor(name: string, numFeet: number) { }
}
class Size {
    feet: number;
    constructor(numFeet: number) { };
}

let animal: Animal = new Animal("xxx", 12333);
let size: Size = new Size(123);
animal = size;
size = animal;