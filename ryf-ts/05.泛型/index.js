function createArray(length, value) {
    var result = new Array(length);
    for (var i = 0; i < length; ++i) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'x'));
