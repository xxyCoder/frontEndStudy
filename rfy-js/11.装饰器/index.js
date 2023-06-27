function testable1(target) {
    target.isTestble = true;
}

@testable1
class MyTestbleClass1 { }
console.log(MyTestbleClass.isTestble);

// 传递参数
function testable2(isTestble) {
    return function (target) {
        target.isTestble = isTestble;
    }
}
@testable2
class MyTestbleClass2 { }

// 装饰类
function logged(value, { kind, name }) {
    if (kind === "class") {
        return class extends value {
            constructor(...args) {
                super(...args);
                console.log(name);
            }
        }
    }
}
@logged
class c { }

// 方法装饰器
function replaceMethod() {
    return function () {
        return `how are your, ${this.name}`
    }
}
class Person {
    constructor(name) {
        this.name = name;
    }
    @replaceMethod
    hello() {
        return `hi, ${this.name}`;
    }
}

// 修饰属性
function logged2(value, { kind, name }) {
    if(kind === 'field') {
        return function (initValue) {
            return initValue;
        }
    }
}
class C {
    @logged2
    x = 1;
}