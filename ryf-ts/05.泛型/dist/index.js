// 泛型函数
// 默认参数
function createArray(length, value) {
    var result = new Array(length);
    for (var i = 0; i < length; ++i) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'x'));
// 泛型类
var genericNumber = /** @class */ (function () {
    function genericNumber() {
    }
    return genericNumber;
}());
// 多个类型
function swap(a, b) {
    return [b, a];
}
function logLength(arg) {
    console.log(arg.length);
}
