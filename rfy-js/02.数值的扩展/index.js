// 浮点数的区别
console.log(Number(192.3)); // 192.3
console.log(Number.parseInt(192.3));  // 192
console.log(Number.parseFloat(192.3));  // 192.3

// 整数的区别
console.log(Number(192));   // 192
console.log(Number.parseInt(192));  // 192
console.log(Number.parseFloat(192));    // 192

console.log(Number(0x12));   // 18
console.log(Number.parseInt(0x12));  // 18
console.log(Number.parseFloat(0x12));    // 18

// 非数值的区别
console.log(Number(true));  // 1
console.log(Number.parseInt(true)); //NaN
console.log(Number.parseFloat(true));   // NaN

// 字符串区别
console.log(Number("true"));    // 1
console.log(Number.parseInt("true"));   // NaN
console.log(Number.parseFloat("true")); // NaN

console.log(Number("123##"));   // NaN
console.log(Number.parseInt("123##"));  // 123
console.log(Number.parseFloat("123##"));    // 123

console.log(Number("#123##"));  // NaN
console.log(Number.parseInt("#123##")); // NaN
console.log(Number.parseFloat("#123##"));   // NaN

console.log(Number(""));   // 0
console.log(Number.parseInt(""));  // NaN
console.log(Number.parseFloat(""));    // NaN

console.log(Number("0x12"));   // 18
console.log(Number("123")); // 123
console.log(Number.parseInt("0x12"));  // 18
console.log(Number.parseFloat("0x12"));    // 0

// 特殊类型
console.log(Number(null));   // 0
console.log(Number.parseInt(null));  // NaN
console.log(Number.parseFloat(null));    // NaN

console.log(Number(undefined));   // NaN
console.log(Number.parseInt(undefined));  // NaN
console.log(Number.parseFloat(undefined));    // NaN

// bigint
console.log(666 === 666n);
let bg = BigInt(123);
console.log(bg.toString());
console.log(bg.valueOf());