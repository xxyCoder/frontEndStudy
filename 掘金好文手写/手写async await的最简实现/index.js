function genertorToAsync(gn) {
    return function (...args) {
        // 相当于 const it = gn();
        const it = gn.apply(this, ...args);
        // 使用promise完成await
        return new Promise((resolve, reject) => {
            // key的取值有两种 next throw，val是yield之后的结果
            function next(key, args) {
                let genertorResult;
                try {
                    genertorResult = it[key](args);
                } catch (e) {
                    return reject(e);
                }
                const { value, done } = genertorResult;
                if (done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then(val => next('next', val), val => next('throw', val));
                }
            }
            next('next');
        })
    }
}

function* gn() {
    console.log('start');
    const d1 = yield new Promise(resolve => {
        setTimeout(() => {
            console.log(1);
            resolve(1);
        }, 1000);
    });
    console.log("d1:", d1);
    const d2 = yield new Promise(resolve => {
        console.log(2);
        resolve(2);
    }, 500);
    console.log("d2:", d2);
    return "success";
}

// const it = gn();
// const d1 = it.next();
// d1.value.then(val => {
//     return it.next(val).value;
// }).then(val => {
//     return it.next(val).value;
// }).then(val => {
//     console.log(val);
// })

genertorToAsync(gn);