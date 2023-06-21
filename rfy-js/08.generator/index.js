function* helloWordGenertor() {
    console.log('start');
    const res = yield 'hello';  // yield是暂停标识
    console.log(res);
    yield 'world';
    console.log('end');
    return 'notUndefined'   // 没有return 则值为undefined
}
const it = helloWordGenertor();
// console.log(...it);
console.log(it.next()); // next是遍历下一个状态
console.log(it.next('yield'));
console.log(it.next());

// 抛出错误
function* g() {
    try {
        yield;
    } catch (e) {
        console.log(`内部捕获 ${e}`);
    }
}

const itg = g();
itg.next();
try {
    itg.throw('a');
    itg.throw('b');
} catch (e) {
    console.log(`外部捕获 ${e}`);
}

// 终结
function* gen() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } finally {
        console.log(111);
    }
}
const itgen = gen();
console.log(itgen.next());
console.log(itgen.return('foo'));
console.log(itgen.next());

// this问题
function* myGenerator(context) {
    console.log(context, this);
}

const itm = myGenerator.call({ prop: 'value' }, { arg: 'argument' }); // 输出：{prop: 'value'}
itm.next();
