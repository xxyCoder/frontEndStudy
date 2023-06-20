// 泛型函数
// 默认参数
function createArray<T = number>(length: number, value: T): Array<T> {
    let result: Array<T> = new Array(length);
    for (let i: number = 0; i < length; ++i) {
        result[i] = value;
    }
    return result;
}

console.log(createArray<string>(3, 'x'));

// 接口泛型
interface createArrarFunc1 {
    <T>(length: number, value: T): Array<T>;
}

interface createArrarFunc2<T> {
    (length: number, value: T): Array<T>;
}

// 泛型类
class genericNumber<T> {
    zeroValue: T;
}

// 多个类型
function swap<T, U>(a: T, b: U): [U, T] {
    return [b, a];
}

// 泛型约束
interface hasLength {
    length: number;
}
function logLength<T extends hasLength>(arg: T): void {
    console.log(arg.length);
}
