#!/usr/bin/env node
console.log(2 ** 4);    // 16
console.log(2 ** 2 ** 3);   // 256
let m = 2;
m **= 2;
console.log(m);
// 圆括号的影响
let obj = {
    b: {
        c: 1
    },
    c: 2
}

console.log((obj?.b).c);