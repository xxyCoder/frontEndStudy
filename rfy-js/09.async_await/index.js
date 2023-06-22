async function f1() {
    throw new Error("error");
}
f1()
    .then(val => {
        console.log(val);
    })
    .catch(err => {
        console.log('报错了', err);
    })

async function f2() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    })
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(111);
        }, 1000);
    });
    console.log('end');
    return 123;
}
f2()
    .then((val) => {
        console.log(val);
    })
    .catch(err => {
        console.log(err);
    })

async function f3() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
    })
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(111);
            }, 1000);
        });
    } catch (err) {
        console.log('catch', err);
    }
    console.log('end');
    return 123;
}
f3()
    .then((val) => {
        console.log(val);
    })
    .catch(err => {
        console.log(err);
    })

// 实现原理
function spawn(genF) {
    return new Promise(function (resolve, reject) {
        const gen = genF(); // 拿到迭代器
        function step(nextF) {
            let next;
            try {
                next = nextF(); // 执行函数，调用next方法
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function (v) {
                step(function () {
                    return gen.next(v);
                });
            }, function (e) {
                step(function () {
                    return gen.throw(e);
                })
            });
        }
        step(function () {
            return gen.next(undefined);
        })
    });
}