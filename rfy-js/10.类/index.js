class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
}

console.log(typeof Point, Point === Point.prototype.constructor);

// 新写法
class IncreaseCounter {
    // 实例属性定义在类的最顶层
    #count = 0; // 私有属性
    static scount = 0;
    // 静态块
    static {
        this.scount = 111;
    }
    get value() {
        console.log('count');
        return this.#count;
    }
    increment() {
        this.#count++;
        this.scount++;  // 实例身上没有
        IncreaseCounter.scount++;
    }
    static show() {
        console.log(this.scount);   // 静态方法的this指向类
    }
}
let c1 = new IncreaseCounter();
let c2 = new IncreaseCounter();
const descriptor = Object.getOwnPropertyDescriptor(IncreaseCounter.prototype, "value");
c1.increment();
console.log(c2.value, descriptor, IncreaseCounter.scount);