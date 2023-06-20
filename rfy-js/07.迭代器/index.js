const obj = {
    a: 1,
    b: 2,
    c: {
        d: 3
    },
    [Symbol()]: "foo",
    [Symbol.iterator]() {
        const keys = Reflect.ownKeys(obj);
        let idx = 0;
        return {
            next() {
                return {
                    value: idx !== keys.length ? obj[keys[idx++]] : undefined,
                    done: idx === keys.length
                }
            }
        }
    }
};

for (const value of obj) {
    console.log(value);
}

const it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

// for...in for...of区别
const arr = [1, 2, 3, [5, 6, 7]];
for (const key of arr) {
    console.log(key);
}
// length不能被枚举，这是因为它是非枚举属性
for (const key in arr) {
    console.log(key, arr[key]);
}