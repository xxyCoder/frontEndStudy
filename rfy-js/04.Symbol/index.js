// 对象作为参数参入，调用其toString方法
const obj = {
    toString() {
        return "abc";
    }
};
let s1 = Symbol(obj);
console.log(s1);
// 实例属性description
console.log(s1.description);

obj[s1] = "abc";
for(let s of Object.getOwnPropertySymbols(obj)) {
    console.log(s);
}

// 相同的Symbol
let s2 = Symbol.for("sss");
let s3 = Symbol.for("sss");

console.log(s2 === s3);