class MyPromise {
    constructor(executor) {
        if (typeof executor !== 'function') {
            throw Error("不是函数");
        }
        this.state = "pending"; // 当前promise的状态
        this.value = undefined; // 状态是fulfilled时候的值
        this.reason = undefined;    // 状态是rejected时候的原因

        this.onFulfilledCallbacks = []; // 用于收集then中状态为fulfilled需要调用的函数
        this.onRejectedCallbacks = [];  // 用于收集then中状态为rejected需要调用的函数

        // 为promise提供resolve和reject函数
        // 箭头函数的this指向为MyPromise的实例对象
        const resolve = (value) => {
            if (this.state === "pending") {  // 状态落定就无法更改
                this.state = "fulfilled";
                this.value = value;
                // 状态一旦落定，就要执行之前收集对应状态的函数
                this.onFulfilledCallbacks.forEach(cb => cb(this.value));
            }
        }
        const reject = (reason) => {
            if (this.state === "pending") {
                this.state = "rejected";
                this.reason = reason;
                this.onRejectedCallbacks.forEach(cb => cb(this.reason));
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        // 传入的如果不是函数，则用空函数包裹
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
        onRejected = typeof onRejected === 'function' ? onRejected : (reson) => reson;

        const promise = new MyPromise((resolve, reject) => {
            // 封装函数，避免冗余代码，但是要写在内部，不然resolve和reject是未定义的
            const onFulfilledTask = (value) => {
                try {
                    const res = onFulfilled(value);
                    if (res instanceof MyPromise) {
                        console.log(res);
                        res.then(resolve, reject);
                    } else {
                        resolve(res);
                    }
                } catch (err) {
                    reject(err);
                }
            }
            const onRejectedTask = (reason) => {
                try {
                    const res = onRejected(reason);
                    if (res instanceof MyPromise) {
                        res.then(resolve, reject);
                    } else {
                        // then的返回值只要不报错，都使用resolve包裹
                        resolve(res);
                    }
                } catch (err) {
                    reject(ers);
                }
            }
            if (this.state === "pending") {
                this.onFulfilledCallbacks.push((value) => {
                    onFulfilledTask(value);
                });
                this.onRejectedCallbacks.push((reason) => {
                    onRejectedTask(reason);
                });
            } else if (this.state === "fulfilled") {
                onFulfilledTask(this.value);
            } else {
                onRejectedTask(this.reason);
            }
        })

        return promise;
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }

}
// 静态方法
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        let results = [], count = promises.length;
        if (count === 0) {
            resolve(results);
            return;
        }
        promises.forEach((promise, index) => {
            promise.then((result) => {
                results[index] = result;
                --count;
                if (count === 0) {
                    resolve(results);
                }
            }).catch(error => { // 一旦有错误直接将状态变为rejected
                reject(error);
            })
        })
    })
}
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => { // 竞速，看谁先执行完状态就是谁
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        promises.forEach(promise => {
            promise.then(value => resolve(value)).catch(error => reject(error));
        })
    })
}
MyPromise.resolve = function (value) {
    return new MyPromise(resolve => resolve(value));
}
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
}
MyPromise.allSettled = function (promises) {
    return new MyPromise(resolve => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        let results = [], count = promises.length;
        if (count === 0) {
            resolve(results);
            return;
        }
        promises.forEach((promise, index) => {
            promise.then(result => {
                results[index] = { state: "fulfilled", value: result };
                --count;
                if (count === 0) {
                    resolve(results);
                }
            }).catch(error => {
                results[index] = { state: "rejected", reason: error };
                --count;
                if (count === 0) {
                    resolve(results);
                }
            })
        })
    })
}
MyPromise.any = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('Argument must be an array'))
        }
        let errors = [], count = promises.length;
        promises.forEach((promise, index) => {
            promise.then(resolve, (reason) => {
                errors[index] = { state: "rejected", reason };
                --count;
                if (count === 0) {
                    reject(new AggregateError(errors))
                }
            })
        })
    })
}


let p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
});

p
    .then((value) => {
        console.log('value', value);
        return 456;
    });

p.
    then((value) => {
        console.log('value', value);
        return 789;
    })
    .then((value) => {
        console.log(value);
        return new MyPromise((resolve, reject) => {
            resolve(10);
        })
    })
    .then(val => {
        console.log(val);
    })