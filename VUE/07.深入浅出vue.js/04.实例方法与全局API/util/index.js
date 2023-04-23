const callbacks = [];   // 存储用户回调
let pending = false;    // 标记是否已经向队列添加了一个任务

function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;   // 清空
    for(let i = 0;i < copies.length;++ i) {
        copies[i]();
    }
}

let microTimerFunc;
// 给回调函数做一层包装
let macroTimeFunc;

// 判断兼容性 哪个兼容使用哪个函数
if(typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    macroTimeFunc = () => {
        setImmediate(flushCallbacks);
    }
}
else if(typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) || MessageChannel.toString() === '[object MessageChannelConstructor]')) {
    const channel = new MessageChannel();
    const port = channel.port2;
    channel.port1.onmessage = flushCallbacks;
    macroTimeFunc = () => {
        port.postMessage(1);
    }
}
else {
    macroTimeFunc = () => {
        setTimeout(flushCallbacks,0);
    }
}

let useMacroTask = false;
// 如果在回调中修改了数据，则该操作被推到宏任务中
// 比如说点击事件中回调函数使用了其进行包装，那么触发的时候，如果在回调函数中修改了数据则会被推到宏任务中
export function withMacroTask(fn) {
    return fn._withTask || (fn._withTask = function() {
        useMacroTask = true;
        const res = fn.apply(null,arguments);   
        useMacroTask = false;
        return res;
    })
}

// 如果浏览器不支持promise,则降级为宏人物
if(typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    microTimerFunc = () => {
        p.then(flushCallbacks);
    }
}
else {
    microTimerFunc = macroTimeFunc;
}

export function nextTick(cb,ctx) {
    let _resolve;
    callbacks.push(() => {
        if(cb) {
            cb.call(ctx);
        } else if(_resolve) {   // 如果没有提供回调且支持Promise的环境，则返回一个Promise
            _resolve(ctx);
        }
    });
    // 如果是本轮事件循环的第一次使用
    // 一轮只会执行事件循环中flushCallbacks一次
    if(!pending) {
        pending = true;
        if(useMacroTask) {
            macroTimeFunc();
        } else {
            microTimerFunc();
        }
    }

    if(!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        })
    }
}